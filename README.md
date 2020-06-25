
#### HiTable
##### 表格相关参数
| 参数   | 说明  |类型 |可选值 |默认值 |
| :----| :---- | :---- | :---- |:---- |
| hasCheckbox | 单元格 | boolean | — |false |
| loading | 单元格 | boolean |— |false |
| border | 是否带有纵向边框 | boolean |— |false |
| stripe | 是否为斑马纹table | boolean |— |false |
| highLightCurrentRow | 是否高亮当前行 | boolean |— |false | 

##### 列相关参数
| 参数   | 说明  |类型 |可选值 |默认值 |
| :----| :---- | :---- | :---- |:---- |
| label | 显示的标题 | string | — |— |
| prop | 对应列内容的字段名 | string | — |— |
| align | 对齐方式 | String | left/center/right |left |
| tooltip | 当内容过长被隐藏时显示 tooltip | boolean |— |false |
| width | 对应列的宽度 | string |— |— |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 |boolean| true, left, right |—  |
| show | 是否显示对应列 | boolean |— |true | 
| disabled | 按钮是否禁用（操作列的按钮特有） | boolean |— |false | 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
