/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function resetFormx (formRef,...excludeFields) {
        const $form=this.$refs[formRef]
        const $data=this.$data
        const $options=this.$options.data.call(this)
        if(!excludeFields||excludeFields.length===0){
            excludeFields=['ruleValidate']
        }
        for(const attr in $data) {
            if(excludeFields&&excludeFields.includes(attr)){
                continue
            }
            $data[attr]=$options[attr]
        }
        $form && this.$nextTick(()=>{
            $form.resetFields()&&$form.clearValidate()
        })
    }

    //把文件按照二进制进行读取
export function readFile(file) {
return new  Promise(resolve => {
    let reader=new FileReader()
    reader.readAsBinaryString(file)
    reader.onload=ev=>{
        resolve(ev.target.result)
    }
})
}
