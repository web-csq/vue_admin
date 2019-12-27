function getGradeNameByGradeCode  (gradeCode) {// 通过年级code，获取年级名称
    switch (gradeCode){
        case 1:
            return "七年级";
            break;
        case 2:
            return "八年级";
            break;
        case 3:
            return "九年级";
            break;
        case 4:
            return "高一";
            break;
        case 5:
            return "高二";
            break;
        case 6:
            return "高三";
            break;
        case 7:
            return "一年级";
            break;
        case 8:
            return "二年级";
            break;
        case 9:
            return "三年级";
            break;
        case 10:
            return "四年级";
            break;
        case 11:
            return "五年级";
            break;
        case 12:
            return "六年级";
            break;
        default:
            return "未知年级";
    }
}
function getSubjectNameBySubjectId(subjectId) {
    switch (subjectId) {
        case 1:
            return "初中语文";
            break;
        case 2:
            return "初中数学";
            break;
        case 3:
            return "初中英语";
            break;
        case 4:
            return "初中物理";
            break;
        case 5:
            return "初中化学";
            break;
        case 6:
            return "初中生物";
            break;
        case 7:
            return "初中历史";
            break;
        case 8:
            return "初中地理";
            break;
        case 9:
            return "高中语文";
            break;
        case 10:
            return "高中数学";
            break;
        case 11:
            return "高中英语";
            break;
        case 12:
            return "高中物理";
            break;
        case 13:
            return "高中化学";
            break;
        case 14:
            return "高中生物";
            break;
        case 15:
            return "高中历史";
            break;
        case 16:
            return "高中地理";
            break;
        case 17:
            return "高中政治";
            break;
        case 19:
            return "初中政治";
            break;
        case 20:
            return "小学奥数";
            break;
        case 21:
            return "小学语文";
            break;
        case 22:
            return "小学数学";
            break;
        case 23:
            return "小学英语";
            break;
        case 24:
            return "初中科学";
            break;
        default:
            return "未知科目";
    }
    console.log('学科');
}

//学段,根据学段获取年级
function getGradeListBySessions(sessions){
    let toallGrade = [];
    switch(sessions){
        case 1:
            toallGrade = [
                {id:1,name:'七年级',session:1},
                {id:2,name:'八年级',session:1},
                {id:3,name:'九年级',session:1}
            ];
            break;
        case 2:
            toallGrade = [
                {id:4,name:'高一',session:2},
                {id:5,name:'高二',session:2},
                {id:6,name:'高三',session:2}
            ];
            break;
        case 3:
            toallGrade = [
                {id:7,name:'一年级',session:3},
                {id:8,name:'二年级',session:3},
                {id:9,name:'三年级',session:3},
                {id:10,name:'四年级',session:3},
                {id:11,name:'五年级',session:3},
                {id:12,name:'六年级',session:3},
            ]
            break;
    }
    return toallGrade;
}

export {
    getGradeNameByGradeCode,
    getSubjectNameBySubjectId,
    getGradeListBySessions
} 