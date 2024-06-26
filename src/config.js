export const chinaMapConfig = ({ data, max }) => {
    return {
        title: {
            // 标题组件
            show: false,
            text: "数据地图",
            // subtext: '数据来源于 xx平台',
            // sublink: 'http://www.census.gov/popest/data/datasets.html',
            left: "right",
            textStyle: {
                color: "#000"
            }
        },
        tooltip: {
            // 提示框
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
                let { data = {} } = params;
                let { value = 0 } = data;
                return `${params.name}<br/>数量: ${value}`;
            }
        },
        visualMap: {
            // 视觉映射组件
            show: false,
            type: "continuous",
            // left: "left",
            min: 0,
            max: max,
            inRange: {
                color: ["#e5f7ff", "#096dd9", "#fedeb5", "#f96a35", "#c3380e", "#942005", '#5b1305']
            },
            text: [`最大值：${max}`, 0],
            textStyle: { color: "#000" },
            calculable: true
        },
        toolbox: {
            // 工具导航
            show: true,
            left: "left",
            top: "top",
            feature: {
                dataView: { readOnly: false },
                restore: {},
                saveAsImage: {}
            }
        },
        dataset: {
            source: data
        },
        series: {
            data,
            // 地图,可以是数组，多个
            label: {
                show: true, //显示省市名称
                position: [1, 100], // 相对的百分比
                fontSize: 12,
                offset: [2, 0],
                align: "left"
            },
            itemStyle: {
                areaColor: "#71d5a1", // 地图图形颜色
                borderColor: "#2979ff"
            },
            // 设置高亮状态下的多边形和标签样式
            emphasis: {
                // 设置区域样式
                itemStyle: {
                    areaColor: "#ffff99", // 黄色
                    borderColor: "#f29100", // 描边颜色黄色
                },
                // 设置字体
                label: {
                    fontSize: 16, // 16px
                    color: "#f29100", // 白色
                },
            },
            type: "map",
            roam: true,
            map: "china",
            zoom: 1, // 当前视角的缩放比例
            scaleLimit: {
                max: 10,
                min: 1 // 设置默认缩放效果
            },
            top: "10%" // 距离顶部距离
        }
    };
};
