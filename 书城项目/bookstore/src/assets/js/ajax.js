/**
 * Created by Administrator on 2017/4/25 0025.
 */

//获取章节id
var getChapterInfo=function(callback,ChapterId) {

    $.get('src/assets/data/chapter.json',function (data) {
        var Chapter_Id=data.chapters[ChapterId].chapter_id;
        var length=data.chapters.length;
        callback && callback(Chapter_Id,length);
    },'json')
};

//获取章节内容
var getChapterContent=function (Chapter_Id,callback) {
    $.get('src/assets/data/data'+ Chapter_Id + '.json',function (data) {
        var url=data.jsonp;
        $.jsonp({
            url:url,
            cache:true,
            callback:'duokan_fiction_chapter',
            success:function (data) {
                var result=$.base64.decode(data);
                var json=decodeURIComponent(escape(result));
                callback && callback(json)
            }
        })
    })
};
export default function (callback,ChapterId) {
    getChapterInfo(function (Chapter_Id,length) {
       getChapterContent(Chapter_Id, function (data) {
             callback && callback(data,length)
        })
    },ChapterId)
}