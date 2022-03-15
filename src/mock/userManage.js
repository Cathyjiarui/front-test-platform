import Mock from 'mockjs'

// 图表数据
let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    modelOne: Mock.Random.integer(100, 8000),
                    modelTwo: Mock.Random.integer(100, 8000),
                    modelThree: Mock.Random.integer(100, 8000),
                    modelFour: Mock.Random.integer(100, 8000),
                    modelFive: Mock.Random.integer(100, 8000),
                    modelSix: Mock.Random.integer(100, 8000)
                })
            )
        }
        return {
            code: 20000,
            data: {
                // 饼图
                videoData: [
                    {
                        name: 'typeOne',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'typeTwo',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'typeThree',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'typeFour',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'typeFive',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    },
                    {
                        name: 'typeSix',
                        value: Mock.Random.float(1000, 10000, 0, 2)
                    }
                ],
                // 柱状图
                userData: [
                    {
                        date: '周一',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周二',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周三',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周四',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周五',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周六',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    },
                    {
                        date: '周日',
                        new: Mock.Random.integer(1, 100),
                        active: Mock.Random.integer(100, 1000)
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData: [
                    {
                        name: 'One',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    },
                    {
                        name: 'Two',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    },
                    {
                        name: 'Three',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    },
                    {
                        name: 'Four',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    },
                    {
                        name: 'Five',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    },
                    {
                        name: 'Six',
                        todayBuy: Mock.Random.integer(100, 1000),
                        monthBuy: Mock.Random.integer(3000, 5000),
                        totalBuy: Mock.Random.integer(40000, 1000000)
                    }
                ]
            }
        }
    }
}