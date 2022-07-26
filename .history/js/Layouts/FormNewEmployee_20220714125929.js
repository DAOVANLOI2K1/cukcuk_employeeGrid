class FormNewEmployee {
    constructor(FormID) {
        let me = this;

        var Url = "http://localhost:3000/employees";

        me.form = $(`#${FormID}`);

        // Khởi tạo sự kiện
        me.initEvent();
    }

    // Hàm khởi tạo sự kiện
    initEvent() {
        let me = this;

        // Gọi hàm đóng form
        me.closeForm();

        // Gọi hàm chứa sự kiện toolbar của form
        me.initEventToolbar();
    }

    // Hàm đóng form add
    closeForm() {
        let me = this;

        me.form.find(".form_closeicon").off('click');
        me.form.find(".form_closeicon").on('click', e => {
            me.form.hide();
        });
    }

    // Hàm sự kiện toolbar của form
    initEventToolbar() {
        let me = this;

        me.form.find("[commandType]").off("click");
        me.form.find("[commandType]").on("click", function() {
            let commandType = $(this).attr("commandType");

            if(me[commandType] && typeof me[commandType] === "function") {
                me[commandType](this);
            }
        });
    }

    // Hàm lưu dữ liệu tạo mới nhân viên
    save() {
        let me = this,
            isValid = me.validateForm();

        if(isValid) {
            let Data = me.getFormData();

            me.saveData(Data);
        }
    }

    // Hàm hủy thêm mới dữ liệu
    cancel(control) {
        let me = this;

        $(control).off('click');
        $(control).on('click', function() {
            me.form.hide();
        });
    }

    // hàm lấy dữ liệu trong form
    getFormData() {
        let me = this,
            data = {
                EmployeeCode: "",
                HoTen: "",
                Gender: "",
                DateOfBirth: "",
                PhoneNumber: "",
                Email: "",
                Position: "",
                Department: "",
                Salary: 0,
                WorkStatus: "",
            };

        me.form.find("[setField]").each(function() {
            let setField = $(this).attr("setField");

            if(setField) {
                data[setField] = $(this).val();
            }
        });
        console.log(data);
        return data;
    }

    // hàm lưu dữ liệu khi save
    saveData(data) {
        let me = this;

        if(data) {
            CommonFn.Ajax(Url, resources.Method.Post, data, function(response) {
                if(response) {
                    me.me.loadData(response);
                }
                else {
                    console.error("Có lỗi trong quá trình tạo dữ liệu!");
                }
            })
        }
    }

    // Hàm validate data trong form
    validateForm() {
        let me = this,
            isValid = me.validateRequired();

        return isValid;
    }

    // Hàm validate required
    validateRequired() {
        let me = this,
         isValid = true,
         requireCount = 0;

        me.form.find("[require]").each(function() {
            let value = $(this).val();

            if(!value) {
                requireCount++;

                $(this).addClass("validateForm");
                $(this).attr("title", "Hãy nhập đầy đủ thông tin!");
            }
            else {
                $(this).removeClass("validateForm");
                $(this).attr("title", "");
            }
        });

        if(requireCount > 0) {
            isValid = false;
        }
        return isValid;
    }

    open(param) {
        let me = this;

        Object.assign(me, param);

        me.form.show();

        // Nếu thêm mới nhân viên thì reset form
        if(param && param.formMode === resources.CommandType.Add) {
            me.resetFormAdd();
        }

        // Nếu sửa nhân viên
        if(param && param.formMode === resources.CommandType.Update) {
            me.resetFormUpdate();
        }
    }

    // Hàm reset form them moi
    resetFormAdd() {
        let me = this;

        me.form.find("[setField]").each(function() {
            let DataType = $(this).attr("DataType") || "string",
                resetFuncName = "reset" + DataType;
            
            // Bỏ validate all khi mở lại form
            $(this).removeClass("validateForm");
            $(this).attr("title", "");

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

    // Hàm reset form update
    resetFormUpdate() {
        let me = this;

        
    }
}