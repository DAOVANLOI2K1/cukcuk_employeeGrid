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
                me[commandType]();
            }
        });
    }

    // Hàm lưu dữ liệu tạo mới nhân viên
    save() {
        let me = this,
            isValid = me.validateForm();

        if(isValid) {
            let Data = me.getFormData();

            me.saveData();
        }
    }

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
        
        me.form.find("[setFieldư")
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
}