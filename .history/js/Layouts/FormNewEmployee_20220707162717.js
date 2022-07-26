class FormNewEmployee {
    constructor(FormID) {
        let me = this;

        me.form = $(`#${FormID}`);

        // Khởi tạo sự kiện
        me.initEvent();
    }

    // Hàm khởi tạo sự kiện
    initEvent() {
        let me = this;

        me.form.find(".form_closeicon").off('click');
        me.form.find(".form_closeicon").on('click', e => {
            me.form.hide();
        });
    }

    open(param) {
        let me = this;

        Object.assign(me, param);

        me.form.show();

        // Nếu them moi nhan vien thi reset form
        if(param && param.formMode === resources.CommandType.Add) {
            me.resetForm();
        }
    }

    // Hàm reset form them moi
    resetForm() {
        let me = this;

        me.form.find("[setField]").each(function() {
            let DataType = $(this).attr("DataType") || "string";
                resetFuncName = "reset" + 

            switch(DataType) {
                case resources.dataType.Number:
                    me.resetNumber(this);
                    break;
                case resources.dataType.Date:
                    break;
                case resources.dataType.Selected:
                    me.resetSelected(this);
                    break; 
                case resources.dataType.String:
                    me.resetString(this);
                    break;   
            }
        });
    }

    // hàm reset data number
    resetNumber(control) {
        let me = this;

        control.value = 0;
    }

    // Hàm reset data select option
    resetSelected(control) {
        let me = this;

        control.options[0].selected = "selected";
    }

    // Hàm reset data String
    resetString(control) {
        let me = this;

        control.value = "";
    }
}