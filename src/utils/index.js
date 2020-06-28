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
export function binaryFileToJson(data,tableHeader) {

    //通过xlsx读取二进制数据 生成表格
    const workbook = xlsx.read(data, {type: "binary"})
    // console.log("workBook:" + JSON.stringify(workbook))
    //拿到第一个表格sheet
    const firstWorkSheet=workbook.Sheets[workbook.SheetNames[0]]
    //通过xlsx将数据转为json数据
    data=xlsx.utils.sheet_to_json(firstWorkSheet)
    console.log("JSON"+JSON.stringify(data))
    //将数据中的中文key变为字段名
    let arr=[]
    data.map((item)=>{
        let obj={}
        tableHeader.map((headerItem)=>{
            obj[headerItem['prop']]=item[headerItem['label']]
            //如果需要判断是否必填 ，可以在列对象增加必填属性，然后继续判断
            //后端表字段有必填限制，应该更方便给出提示
        })

        arr.push(obj)
        console.table("arrr"+JSON.stringify(arr))
        //this.tableData=arr
    })
    return arr
}
