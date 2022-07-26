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

        // Gọi hàm đóng fomr
        me.closeForm();

        // Gọi hàm chứa sự kiện toolbar của form
        me.initEventToolbar();
    }

    // Hàm đóng form add
    closeForm() {
        me.form.find(".form_closeicon").off('click');
        me.form.find(".form_closeicon").on('click', e => {
            me.form.hide();
        });
    }

    // Hàm sự kiện toolbar của form
    initEventToolbar() {
        let me = this;

        me.form.find("[commandType]").each(function() {
            let commandType = $(this)
        })
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
            let DataType = $(this).attr("DataType") || "string",
                resetFuncName = "reset" + DataType;

            // Hàm gọi reset form by data
            if(me[resetFuncName] && typeof me[resetFuncName] === "function") {
                me[resetFuncName](this);
            }
        });
    }

    // hàm reset data number
    resetnumber(control) {
        let me = this;

        control.value = 0;
    }

    // Hàm reset data select option
    resetselected(control) {
        let me = this;

        control.options[0].selected = "selected";
    }

    // Hàm reset data String
    resetstring(control) {
        let me = this;

        control.value = "";
    }
}