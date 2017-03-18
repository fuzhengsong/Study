/**
 * Created by Administrator on 2017/3/15 0015.
 */
/*
* 该设计将飞船分为动力系统，状态系统，能源系统以及信号系统。四个模块
* 通过Mediator与指挥官发出消息指令进行接收和执行
* */

// function $(ele) {
//     return document.querySelector(ele);
// }
//
function $$(ele) {
    return document.querySelectorAll(ele);
}
//私有作用域
(function () {


    //定义私有变量
    var SPACESHIP_SPEED=2;  //飞船飞行速度
    var SPACESHIP_SIZE=40;  //飞船大小
    var SPACESHIP_COUNT=4;  //飞船数量
    var DEFAULT_CHARGE_RATE=0.2;  //飞船充电速度
    var DEFAULT_DISCHARGE_RATE=0.1;  //飞船放电速度
    var POWERBAR_POS_OFFSET=5;   //电量条位置位移
    var POWERBAR_COLOR_GOOD="#70ED3F";  //充电良好时电量条的颜色
    var POWERBAR_COLOR_MEDIUM="#FCCD1F";//电量一般时颜色
    var POWERBAR_COLOR_BAD="#FB0000";   //电量差时颜色
    var POWERBAR_WIDTH=5;   //电量条宽度
    var SCREEN_WIDTH=800;   //屏幕宽度
    var SCREEN_HEIGHT=800;  //屏幕高度
    var SCREEN_CENTER_X=SCREEN_WIDTH/2;  //屏幕x轴中心位置
    var SCREEN_CENTER_Y=SCREEN_HEIGHT/2;    //屏幕y轴中心位置

    var PLANT_RADIUS=50;       //行星半径
    var ORBIT_COUNT=4;          //轨道数量
    var FAILURE_RATE=0.3;   //发送消息失败率

    //根据浏览器设置相应的requestAnimationFrame

    requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;

    /*[spaceship 飞船]
    * @param {[type]} id [飞船id]
    * */
    //创建飞船的构造函数
    var Spaceship=function (id) {
        this.id=id;
        this.power=100;     //初始电量
        this.currState="stop"; //初始状态
        this.mediator=null;  //飞船注册的mediator
        this.orbit=100+50*id-SPACESHIP_SIZE/2;  //飞船所在轨道
        this.deg=0;          //飞船的初始位置
        this.timer=null;
    };

    //飞船的动力系统，控制飞行和停止

    Spaceship.prototype.dynamicManager=function () {
        var self=this;
        var fly=function () {
            self.timer=setInterval(function () {
                self.deg+=SPACESHIP_SPEED;
                if(self.deg>=360) self.deg=0;   //飞行完一圈，重置角度
            },20)
        };
        ConsoleUtil.show("Spaceship No."+self.id+"is flying.");  //左侧消息显示

        var stop=function () {
            clearInterval(self.timer);
            ConsoleUtil.show("Spaceship No."+self.id+"is stop.");
        };
        return{
            fly:fly,
            stop:stop
        };
    };
    
    //能源系统，控制消耗能源和充能的机制
    
    Spaceship.prototype.powerManager=function () {
        var self=this;
        /*charge 飞船充电
        * @return {[boolean]} --充电返回true*/
        
        var charge=function () {
            var chargeRage=DEFAULT_CHARGE_RATE;
            var timer=setInterval(function () {
                //若在飞行或者被销毁则不再充电
                if(self.currState=="fly"||self.currState=="destroy"){
                    clearInterval(timer);
                    return false;
                }
                if(self.power>=100){
                    clearInterval(timer);
                    self.power=100;
                    return false;
                }
                self.power+=chargeRage;
                return true;                //为什么要return
            },20);
            ConsoleUtil.show("Spaceship No."+self.id+"is charging.")
        };
        /*飞船放电
        * @return {[boolean]}  飞船放电true*/

        var discharge=function () {
            var dischargeRage=DEFAULT_DISCHARGE_RATE;
            var timer=setInterval(function () {
                //飞行暂停或者被销毁时不再放电
                if(self.currState=="stop"||self.currState=="destroy"){
                    clearInterval(timer);
                    return false;
                }
                if(self.power<=0){
                    clearInterval(timer);
                    self.stateManager().changeState("stop");
                    return false;
                }
                self.power-=dischargeRage;
            })
        };
        return {
            charge:charge,
            discharge:discharge
        }
    };

    //状态模块设计，标志飞行的状态：飞行，暂停或者销毁

    Spaceship.prototype.stateManager=function () {
        var self=this;
        var state={
            stop:function() {
                    self.currState="stop";
                    self.dynamicManager().stop();
                    self.powerManager().charge();
            },
            fly:function () {
                    self.currState="fly";
                    self.dynamicManager().fly();
                    self.powerManager().discharge();
            },
            destroy:function () {
                    self.currState="destroy";
                    self.mediator.remove(self);//register时，将Mediator对象赋值给了obj.mediator(obj是一个实例)也就是self.mediator(被实例化后，this=self也就等于实例对象);
            }
        };
        changeState=function (states) {
            state[states]&&state[states]();
        };
        return{
            changeState:changeState
        };

    };

    //信号系统，飞船接受指令

    Spaceship.prototype.signalManager=function () {
        var self = this;
        return {
            receive: function (msg, from) {
                if (self.currState != msg.cmd && self.id == msg.id) {
                    self.stateManager().changeState(msg.cmd);
                }
            }
        };
    };
        //指令官对象
        var Commander=function () {
            this.id="Don";
            this.cmds=[];
            this.mediator=null;
        };

        /*
        * [send] 发送指令，并将指令压入指令历史cmds中
        * @param {[type]} msg --消息
        * @return {[type]} [description]*/
        Commander.prototype.send=function (msg) {
            this.mediator.send(msg);
            this.cmds.push(msg);
        };


        var Mediator=function () {
            var spaceships=[];
            var commander=null;
            return{
                /*
                * [register:所有对象需在Mediator内注册，否则无法通讯]
                * @param{[type]} 注册对象
                * @return {[type]} --注册成功返回true，失败返回false
                * */
                register:function (obj) {
                    if(obj instanceof Commander) {
                        commander = obj;
                        obj.mediator = this;          //this是Mediator对象指针
                        ConsoleUtil.show("mediator register" + "Commander" + obj.id);
                        return true;
                    }
                    else if(obj instanceof Spaceship){
                        spaceships[obj.id]=obj;
                        obj.mediator=this;
                        ConsoleUtil.show("mediator register" + "Spaceship" + obj.id);
                        return true;
                    }
                    ConsoleUtil.show("mediator register failed");
                    return false;
                },
                /*
                *[send]发送消息，当超过失败率后，对方可以收到数据；有单播和广播两种发送方式。
                 * @param{[type]} msg --消息
                  * @param{[type]} from--发送方
                  *  @param{[type]} to--接受方
                  *  @return {[type]} --发送成功返回true,失败返回false
                **/
                
                
                send:function (msg,from,to) {
                    var self=this;          //Mediator对象
                    setTimeout(function () {
                        var success=true;
                        if(success){
                            if(to) {                    //to是什么？
                                to.receive(msg, from);
                            }else{
                                if(msg.cmd=="launch"){
                                    self.create(msg);
                                }else{
                                for(var key in spaceships){
                                    if(spaceships[key]!==from){
                                        spaceships[key].signalManager().receive(msg,from);
                                    }
                                }
                                }
                            }
                            ConsoleUtil.show("send success");
                            return true;
                        }else{
                            ConsoleUtil.show("send failed");
                            return false;
                        }
                    },1000);
                },

                /*
                * [remove] 移除通讯对象
                * @param {[type]} obj 移除对象
                * @return {[type]} [description]
                * */

                remove:function (obj) {
                    if(obj instanceof Spaceship){
                        ConsoleUtil.show("destroy spaceship No."+obj.id);
                        alert(spaceships.length);
                        spaceships[obj.id]=undefined;
                        alert(spaceships[obj.id]);
                        return true;
                    }
                    ConsoleUtil.show("mediator remove failed");
                    return false;
                },
                /*
                * create 创建通讯对象
                * @param {[type]} msg--信息
                * @return {[type]} 失败返回false 成功返回true
                * */
                create:function (msg) {
                    if(spaceships[msg.id]!==undefined){
                        ConsoleUtil.show("Spaceship already exists!");
                        return false;
                    }
                    else{
                        var spaceship=new Spaceship(msg.id);
                        this.register(spaceship);
                        return true;
                    }
                } ,

                /*
                * getSpaceships 获取飞船队列
                * @return {[type]} 返回飞船队列*/

                getSpaceships:function () {
                    return spaceships;
                }
            }
        };
        /*
        * message 消息载体
        * @param type target  消息目标
        * @param type command 指令
        * */
        
        var Message=function (target,command) {
            this.id=target;
            this.cmd=null;
            switch(command){
                case "launch":
                case "stop":
                case "fly":
                case"destroy":
                    this.cmd=command;
                    break;
                default:alert("invalid command");
            }
        };
        /*buttonHandler 按钮句柄
        * @param {[type]} commander 点击按钮后，指挥官进行相应操作
        * @return {[type]} 指令正确返回true
        * 
        **/
        
        var buttonHandler=function (commander) {
            var id=null;
            var cmd=null;
            for(var i=0;i<$$(".btn").length;i++){
                $$(".btn")[i].addEventListener("click",function () {
                    var cmdName=$(this).attr("name");
                    switch (cmdName){
                        case "launch":
                        case "stop":
                        case "fly":
                        case "destroy":
                            id=$(this).parent().index();
                            cmd=cmdName;
                            break;
                        default:
                            alert("invalid command!");
                            return false;
                    }
                    var message=new Message(id,cmd);
                    commander.send(message);
                    return true;
                });
            }
        };

        /*动画工具  采用requestAnimationFrame消除闪屏现象*/

        var AnimUtil=(function () {
            var canvas=document.getElementById("screen");
            canvas.width=SCREEN_WIDTH;
            canvas.height=SCREEN_HEIGHT;
            var ctx=canvas.getContext("2d");

            //生成缓存画布？why?
            var cacheCanvas=document.createElement("canvas");
            cacheCanvas.width=SCREEN_WIDTH;
            cacheCanvas.height=SCREEN_HEIGHT;
            var cacheCtx=cacheCanvas.getContext("2d");

            var timer=null;     //定时器
            var mediator=null;  //控制动画刷新的mediator

            /*画行星
            * @param {[type]} _ctx 目标画布*/

            var drawPlant=function (_ctx) {
                var x=SCREEN_CENTER_X-PLANT_RADIUS;
                var y=SCREEN_CENTER_Y-PLANT_RADIUS;
                var plant=new Image;
                plant.src="/fuzhengsong/images/task07/min-iconfont-planet.png";
                plant.onload=function () {
                    _ctx.drawImage(plant,x,y,PLANT_RADIUS*2,PLANT_RADIUS*2);
                }
            };

            /*画飞船轨道
            * @param {[type]} _ctx 目标画布*/

            var drawOrbit=function (_ctx) {
                var x=SCREEN_CENTER_X;
                var y=SCREEN_CENTER_Y;
                for(var i=0;i<ORBIT_COUNT;i++){
                    _ctx.strokeStyle="#999";
                    _ctx.beginPath();
                    _ctx.arc(x,y,100+50*i,0,2*Math.PI);
                    _ctx.closePath();
                    _ctx.stroke();
                }
            };

            /*
            *[动画更新时背景不用刷新，因此仅仅在初始化时绘制一次在background画布上的背景，减少计算量。background画布位于screen画布下面，通过css中z-index属性进行叠加]
             * @return {[type]} [description] */

            (function () {
                var canvas=document.getElementById("background");
                canvas.width=SCREEN_WIDTH;
                canvas.height=SCREEN_HEIGHT;
                var _ctx=canvas.getContext("2d");
                _ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
                drawPlant(_ctx);
                drawOrbit(_ctx);
            })();

            /*画飞船
            *@param  {[type]} _ctx      [目标画布,这里的画布是缓存画布]
             * @param  {[type]} spaceship [飞船]
             * @return {[type]}           [绘画成功返回true，失败返回false]
              * 
              * */
            
            var drawSpaceship=function (_ctx,spaceship) {

                var spaceShipImage=new Image();
                spaceShipImage.src="/fuzhengsong/images/task07/min-iconfont-rocket-active.png";
                //图片加载完成后执行绘图
                spaceShipImage.onload=function () {
                    // try{
                        _ctx.save();    //保存当前画布状态
                        _ctx.translate(SCREEN_CENTER_X,SCREEN_CENTER_Y);
                        _ctx.rotate(-spaceship.deg*Math.PI/180);
                        //画电量条
                        _ctx.beginPath();
                        if(spaceship.power>60){
                            _ctx.strokeStyle=POWERBAR_COLOR_GOOD;
                        }else if(spaceship.power<=60&&spaceship.power>=20){
                            _ctx.strokeStyle=POWERBAR_COLOR_MEDIUM;
                        }else{
                            _ctx.strokeStyle=POWERBAR_COLOR_BAD;
                        }
                        _ctx.lineWidth=POWERBAR_WIDTH;              //电量条宽度
                        _ctx.moveTo(spaceship.orbit,-POWERBAR_POS_OFFSET);  //画电量条的位置
                        _ctx.lineTo(spaceship.orbit+(spaceship.power/100)*SPACESHIP_SIZE,-POWERBAR_POS_OFFSET);
                        _ctx.stroke();
                        _ctx.drawImage(spaceShipImage,spaceship.orbit,0,SPACESHIP_SIZE,SPACESHIP_SIZE);
                        _ctx.restore();
                        ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
                        ctx.drawImage(cacheCanvas,0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
                        return true;
                    // }catch(error){
                    //
                    //     return false;
                    // }
                }
            };

            /**
             * [onDraw 绘制屏幕画布]
             * @param  {[type]} spaceships [飞船队列]
             * @return {[type]}            [description]
             */
            var onDraw=function (spaceships) {
                if(!(spaceships.every(function (item) {
                     return item===undefined;
                    }))){
                    //清空缓存画布
                    cacheCtx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
                    //迭代生成所有飞船
                    for(var i=0;i<spaceships.length;i++){
                        if(spaceships[i]){
                        drawSpaceship(cacheCtx,spaceships[i]);
                        }
                    }

                }
                else{
                    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
                }
            };

            /*动画循环*/

            var animLoop=function () {
                requestAnimationFrame(animLoop);
                onDraw(mediator.getSpaceships());
            }

            /**
             * [setMediator  为AnimUtil设置Mediator，通过mediator保存的状态控制动画更新]
             * @param {[type]} _mediator [description]
             */

            var setMediator=function (_mediator) {
                mediator=_mediator;
            };

            return {
                setMediator:setMediator,
                animLoop:animLoop
            }


        })();



    ConsoleUtil=(function () {
         var show=function (msg) {
             var li=document.createElement("li");
             li.innerHTML=msg;
             $("#console ul").append(li);

         };
         return {
             show: show          //返回一个对象;
         }
    })();
    //主线程

    window.onload=function () {
        var commander=new Commander();
        var mediator=new Mediator();
        mediator.register(commander);   //注册激活指令官
        buttonHandler(commander);       //激活按钮句柄
        AnimUtil.setMediator(mediator);
        AnimUtil.animLoop()
    }
})();

