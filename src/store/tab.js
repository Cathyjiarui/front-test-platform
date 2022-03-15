export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        menu: [],
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '测试任务',
                icon: 's-order'
            }
        ]
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val;
                let result = state.tabsList.findIndex(item => item.name === val.name);
                result === -1 ? state.tabsList.push(val) : '';
            } else {
                state.currentMenu = null;
            }
        },
        closeTab(state, val) {
            let result = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(result, 1);
        },
        CollapseMenu(state){
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {}
}