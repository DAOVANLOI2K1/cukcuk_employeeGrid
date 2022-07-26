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

        if(param && param.form)
    }
}