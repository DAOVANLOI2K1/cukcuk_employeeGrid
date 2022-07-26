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
        
        me.form.find(".form_closeicon").offclick
    }
}