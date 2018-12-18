import Config from "../config/config.js";
const apiBaseUrl = Config.apiBaseUrl;
// const apiPcsUrl = Config.apiPcsUrl;
// const apiPqsUrl = Config.apiPqsUrl;
const serviceModule = {
    //登录
    login: {
        url: apiBaseUrl + 'school/login',
        method: 'post',
        showLoading: false
    },
    //通用接口
    getField: {
        url: apiBaseUrl + 'school/common/getField',
        method: 'get',
        showLoading: false
    },
    setField: {
        url: apiBaseUrl + 'school/common/setField',
        method: 'post',
        showLoading: false
    },
    // /school/common/setFieldByID
    setFieldByID: {
        url: apiBaseUrl + 'school/common/setFieldByID',
        method: 'post',
        showLoading: false
    },
    getFieldById: {
        url: apiBaseUrl + 'school/common/getFieldByID',
        method: 'get',
        showLoading: false
    },
    getknowledge: {
        url: apiBaseUrl + 'school/project/getKnowledge',
        method: 'get',
        showLoading: false
    },
    //获取上下架项目GET /school/manager/getCourseList
    getCourseList: {
        url: apiBaseUrl + 'school/manager/getCourseList',
        method: 'get',
        showLoading: false
    },
    //模仿制作GET /school/project/getCourseStepList
    getCourseStepList: {
        url: apiBaseUrl + 'school/project/getCourseStepList',
        method: 'get',
        showLoading: false
    },
    //获取创意列表 /school/project/getDesignList
    getDesignList: {
        url: apiBaseUrl + 'school/project/getDesignList',
        method: 'get',
        showLoading: false
    },
    //获取某个创意GET /school/project/getDesign
    getDesign: {
        url: apiBaseUrl + 'school/project/getDesign',
        method: 'get',
        showLoading: false
    },
    //获取工程实验 GET /school/project/getExperimentList
    getExperimentList: {
        url: apiBaseUrl + 'school/project/getExperimentList',
        method: 'get',
        showLoading: false
    },
    //查询工程实验案例列表 GET /school/project/getExperimentDetailList
    getExperimentDetailList: {
        url: apiBaseUrl + 'school/project/getExperimentDetailList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getExperiment 查询工程试验
    getExperiment: {
        url: apiBaseUrl + 'school/project/getExperiment',
        method: 'get',
        showLoading: false
    },
    //全科阅读列表GET /school/project/getRefernenceList
    getRefernenceList: {
        url: apiBaseUrl + 'school/project/getRefernenceList',
        method: 'get',
        showLoading: false
    },
    // 读取全科阅读 GET /school/project/getRefernence
    getRefernence: {
        url: apiBaseUrl + 'school/project/getRefernence',
        method: 'get',
        showLoading: false
    },
    // 获取平台信息GET /school/manager/getSchoolInfo
    getSchoolInfo: {
        url: apiBaseUrl + 'school/manager/getSchoolInfo',
        method: 'get',
        showLoading: false
    },
    //
    setSchoolInfo: {
        url: apiBaseUrl + 'school/manager/setSchoolInfo',
        method: 'post',
        showLoading: false
    },
    uploadFile: {
        url: apiBaseUrl + "school/manager/uploadFile",
        tag: 1,
        method: 'post',
        showLoading: false
    },
    // 查询班级信息GET /school/manager/getClassList
    getClassList: {
        url: apiBaseUrl + 'school/manager/getClassList',
        method: 'get',
        showLoading: false
    },
    // 查询组织列表 GET /school/manager/queryList
    queryOrgList: {
        url: apiBaseUrl + 'school/manager/queryList',
        method: 'get',
        showLoading: false
    },
    //查询可订阅课程
    getSubscriptionList: {
        url: apiBaseUrl + 'school/manager/getSubscriptionList',
        method: 'get',
        showLoading: false
    },
    // 材料列表GET /school/manager/getCourseMeterialList
    getCourseMeterialList: {
        url: apiBaseUrl + 'school/manager/getCourseMeterialList',
        method: 'get',
        showLoading: false
    },
    // 视频列表GET /school/manager/getCourseVedioList
    getCourseVedioList: {
        url: apiBaseUrl + 'school/manager/getCourseVedioList',
        method: 'get',
        showLoading: false
    },
    //视频订阅 POST /school/manager/addSubscriptionCourse
    addSubscriptionCourse: {
        url: apiBaseUrl + 'school/manager/addSubscriptionCourse',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getIntelligenteList  读取智能加强的列表，按sortId排序
    getIntelligenteList: {
        url: apiBaseUrl + 'school/project/getIntelligenteList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getIntelligente
    getIntelligente: {
        url: apiBaseUrl + 'school/project/getIntelligente',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/addIntelligent
    addIntelligent: {
        url: apiBaseUrl + 'school/project/addIntelligent',
        method: 'get',
        showLoading: false
    },
    //GET /school/loginOut
    loginOut: {
        url: apiBaseUrl + 'school/loginOut',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getDreamList 获取梦工厂列表
    getDreamList: {
        url: apiBaseUrl + 'school/project/getDreamList',
        method: 'get',
        showLoading: false
    },
    // 查询梦工厂内容  GET /school/project/getDream
    getDream: {
        url: apiBaseUrl + 'school/project/getDream',
        method: 'get',
        showLoading: false
    },
    //POST /school/project/addExperimentDetail 布置工程实验
    addExperimentDetail: {
        url: apiBaseUrl + 'school/project/addExperimentDetail',
        method: 'get',
        showLoading: false
    },
    // GET /school/project/getScoreList
    getScoreList: {
        url: apiBaseUrl + 'school/project/getScoreList',
        method: 'get',
        showLoading: false
    },
    // GET /school/project/getScoreDetailList
    getScoreDetailList: {
        url: apiBaseUrl + 'school/project/getScoreDetailList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getRefernenceDetailList
    getRefernenceDetailList: {
        url: apiBaseUrl + 'school/project/getRefernenceDetailList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getAllDetection 获取即时检测列表
    getAllDetection: {
        url: apiBaseUrl + 'school/project/getAllDetection',
        method: 'get',
        showLoading: false
    },
    // POST /school/project/setDetection
    setDetection: {
        url: apiBaseUrl + 'school/project/setDetection',
        method: 'post',
        showLoading: false
    },
    //GET /school/project/addDetectionDetail 布置检测题
    addDetectionDetail: {
        url: apiBaseUrl + 'school/project/addDetectionDetail',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getMindList 脑图列表
    getMindList: {
        url: apiBaseUrl + 'school/project/getMindList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getMindDetailList 脑洞开开开
    getMindDetailList: {
        url: apiBaseUrl + 'school/project/getMindDetailList',
        method: 'get',
        showLoading: false
    },
    // 新品推广会列表 GET /school/project/getPopularizeList
    getPopularizeList: {
        url: apiBaseUrl + 'school/project/getPopularizeList',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getPopularize 
    getPopularize: {
        url: apiBaseUrl + 'school/project/getPopularize',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getMind
    getMind: {
        url: apiBaseUrl + 'school/project/getMind',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/getMindDetail
    getMindDetail: {
        url: apiBaseUrl + 'school/project/getMindDetail',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/addMind
    addMind: {
        url: apiBaseUrl + 'school/project/addMind',
        method: 'get',
        showLoading: false
    },
    //GET /school/project/delMind
    delMind: {
        url: apiBaseUrl + 'school/project/delMind',
        method: 'get',
        showLoading: false
    },
    //POST /school/project/setMind
    setMind: {
        url: apiBaseUrl + 'school/project/setMind',
        method: 'post',
        showLoading: false
    },
    //school/common/getFunctionDesc
    getFunctionDesc: {
        url: apiBaseUrl + 'school/common/getFunctionDesc',
        method: 'get',
        showLoading: false
    }
}
const ApiSetting = {...serviceModule };

export default ApiSetting