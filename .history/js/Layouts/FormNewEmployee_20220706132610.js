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

    resetForm() {
        let me = this;

        me.form.find("[setField]").each(function() {
            let DataType = $(this).attr("DataType") || "String";

            switch(DataType) {
                case resources.dataType.number:
                    me.resetNumber(this);
                    break;
                case resources.dataType.Date:
                    me.resetDate(this);
                    break;
            }
        });
    }

    resetNumber(control) {
        let me = this;

        control.value = 0;
    }

    resetDate(control) {
        let me = this,
            now = new Date(),
            today = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + (now.getDate() + 1);

        // control.value = today;
        console.log(today);
    }
}