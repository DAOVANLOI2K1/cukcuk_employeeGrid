class Employee {
    constructor (gridID) {
        let me = this

        me.grid = $(`#${gridID}`);

        // Khởi tạo sự kiện
        me.initEvent();

        // Lấy dữ liệu
        me.getData();
    }


    // Hàm chứa sự kiện
    initEvent() {
        let me = this;
    }

    // Hàm lấy dữ liệu
    getData() {

    }
}