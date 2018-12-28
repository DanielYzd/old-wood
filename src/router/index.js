import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login.vue'
import Home from '@/pages/home/home.vue'
import ChildHome from '@/pages/home/childhome.vue'
import ProjectIntroduction from '@/components/wood/ProjectIntroduction.vue'
import ImitationProduction from '@/components/wood/ImitationProduction.vue'
import CreativeDesign from '@/components/wood/CreativeDesign.vue'
import CreativeDesignDetail from '@/components/wood/CreativeDesignDetail.vue'
import KnowledgeHint from '@/components/wood/KnowledgeHint.vue'
import EnginExperiment from '@/components/wood/EnginExperiment.vue'
import EnginExperimentDetail from '@/components/wood/EnginExperimentDetail.vue'
import GeneralReading from '@/components/wood/GeneralReading.vue'
import GeneralReadingDetail from '@/components/wood/GeneralReadingDetail.vue'
import IntelligentEnhancement from '@/components/wood/IntelligentEnhancement.vue'
import IntelligentEnhancementDetail from '@/components/wood/IntelligentEnhancementDetail.vue'
import DreamWorks from '@/components/wood/DreamWorks.vue'
import DreamWorksDetail from '@/components/wood/DreamWorksDetail.vue'
import EvenTesting from '@/components/wood/EvenTesting.vue'
import GroupReview from '@/components/wood/GroupReview.vue'
import NewProduct from '@/components/wood/NewProduct.vue'
import NewProductDetail from '@/components/wood/NewProductDetail.vue'
import BrainOpen from '@/components/wood/BrainOpen.vue'
import VideoSub from '@/components/VideoSub.vue'
import Ue from '@/components/Ue.vue'
import WoodProject from '@/components/WoodProject.vue'
import PlatformInformation from '@/components/PlatformInformation.vue'
import OrganizatioManage from '@/components/OrganizatioManage.vue'
import NotFound from '@/components/404.vue'

Vue.use(Router)


let routes = [{
        path: '/',
        name: 'Login',
        component: Login
    },

    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            { path: '/NotFound', component: NotFound, name: '404' },
            { path: '/VideoSub', component: VideoSub, name: 'VideoSub' },
            { path: '/WoodProject', component: WoodProject, name: 'WoodProject' },
            { path: '/PlatformInformation', component: PlatformInformation, name: 'PlatformInformation' },
            { path: '/OrganizatioManage', component: OrganizatioManage, name: 'OrganizatioManage' },
        ]
    },
    {
        path: '/childhome',
        name: 'ChildHome',
        component: ChildHome,
        children: [
            { path: '/ProjectIntroduction', component: ProjectIntroduction, name: 'ProjectIntroduction' },
            { path: '/ImitationProduction', component: ImitationProduction, name: 'ImitationProduction' },
            { path: '/CreativeDesign', component: CreativeDesign, name: 'CreativeDesign' },
            { path: '/CreativeDesignDetail/:id/:title', component: CreativeDesignDetail, name: 'CreativeDesignDetail' },
            { path: '/KnowledgeHint', component: KnowledgeHint, name: 'KnowledgeHint' },
            { path: '/EnginExperiment', component: EnginExperiment, name: 'EnginExperiment' },
            { path: '/EnginExperimentDetail/:id/:title', component: EnginExperimentDetail, name: 'EnginExperimentDetail' },
            { path: '/GeneralReading', component: GeneralReading, name: 'GeneralReading' },
            { path: '/GeneralReadingDetail/:id/:title', component: GeneralReadingDetail, name: 'GeneralReadingDetail' },
            { path: '/IntelligentEnhancement', component: IntelligentEnhancement, name: 'IntelligentEnhancement' },
            { path: '/IntelligentEnhancementDetail/:id/:title', component: IntelligentEnhancementDetail, name: 'IntelligentEnhancementDetail' },
            { path: '/DreamWorks', component: DreamWorks, name: 'DreamWorks' },
            { path: '/DreamWorksDetail/:id/:title', component: DreamWorksDetail, name: 'DreamWorksDetail' },
            { path: '/EvenTesting', component: EvenTesting, name: 'EvenTesting' },
            { path: '/GroupReview', component: GroupReview, name: 'GroupReview' },
            { path: '/NewProduct', component: NewProduct, name: 'NewProduct' },
            { path: '/NewProductDetail/:id', component: NewProductDetail, name: 'NewProductDetail' },
            { path: '/BrainOpen', component: BrainOpen, name: 'BrainOpen' },
            { path: '/Ue', component: Ue, name: 'Ue' },
        ]
    },
    {
        path: '*',
        component: NotFound
    }
]


const router = new Router({
        routes: routes,
        mode: 'history'
    })
    // router.beforeEach((to, from, next) => {
    //     if (to.matched.length === 0) { //如果未匹配到路由
    //         next('/NotFound'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
    //     } else {
    //         next(); //如果匹配到正确跳转
    //     }
    // });

export default router