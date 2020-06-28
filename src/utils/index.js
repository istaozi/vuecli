import xlsx from "xlsx";
/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function resetFormx(formRef, ...excludeFields) {
    const $form = this.$refs[formRef]
    const $data = this.$data
    const $options = this.$options.data.call(this)
    if (!excludeFields || excludeFields.length === 0) {
        excludeFields = ['ruleValidate']
    }
    for (const attr in $data) {
        if (excludeFields && excludeFields.includes(attr)) {
            continue
        }
        $data[attr] = $options[attr]
    }
    $form && this.$nextTick(() => {
        $form.resetFields() && $form.clearValidate()
    })
}

/**
 * 把文件按照二进制进行读取
 * */
export function readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader()
        //把当前文件以二进制读取
        reader.readAsBinaryString(file)
        reader.onload = event => {
            resolve(event.target.result)
        }
    })
}

/**
 * @description 将二进制数据，转换为标准json
 * @param data [array] 二进制数据
 * @param tableHeader [array] 定义好的列头
 * */
export function binaryDataToJson(data, tableHeader) {

    //通过xlsx读取二进制数据 生成表格
    const workbook = xlsx.read(data, {type: "binary"})
    // console.log("workBook:" + JSON.stringify(workbook))
    //拿到第一个表格sheet
    const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]]
    //通过xlsx将数据转为json数据
    data = xlsx.utils.sheet_to_json(firstWorkSheet)
    console.log("JSON" + JSON.stringify(data))
    //将数据中的中文key变为字段名
    let arr = []
    data.map((item) => {
        let obj = {}
        tableHeader.map((headerItem) => {
            // eslint-disable-next-line no-prototype-builtins
            if ((headerItem.hasOwnProperty('required')&&headerItem['required']===true)){
                if(!(item[headerItem['label']])){
                    return
                }
            }else{
                obj[headerItem['prop']] = item[headerItem['label']]
            }

            //如果需要判断是否必填 ，可以在列对象增加必填属性，然后继续判断

            //后端表字段有必填限制，应该更方便给出提示
        })

        arr.push(obj)
        console.table("arrr" + JSON.stringify(arr))
        //this.tableData=arr
    })
    return arr
}

/**
 * @description 导出数据
 * @param data [array]需要导出的数据
 * @param tableHeader [string] 表头
 * @param excelname [string] 文件名
 * **/
export function exportExcel(data, tableHeader, excelname) {
    const header = tableHeader.map(item => {
        return item.label
    })
    const _data=objectArray2DArray(data)
    _data.unshift(header)
    const worksheet = xlsx.utils.aoa_to_sheet(_data);
    const new_workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(new_workbook, worksheet, excelname ? excelname : "SheetJS");
    xlsx.writeFile(new_workbook, excelname ? (excelname + '.xlsx') : "sheetjs.xlsx");
}

/**
 * 将对象数组的value转为二维数组
 * */
export function objectArray2DArray(objctArray) {
    let array = []
    objctArray.map(item => {
        array.push(Object.values(item))

    })
    return array
}
/**
 * 将对象数组的key转为二维数组
 * */
export function objectArrayK2DArray(objctArray) {
    let array = []
    objctArray.map(item => {
        array.push(Object.keys(item))

    })
    return array
}
