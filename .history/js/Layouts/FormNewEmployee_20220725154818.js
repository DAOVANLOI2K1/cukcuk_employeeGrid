class FormNewEmployee {
    constructor(FormID) {
        let me = this;

        me.Url = "http://localhost:5048/api/v1/Employees";

        me.form = $(`#${FormID}`);

        // Khởi tạo sự kiện
        me.initEvent();
    }

    // Hàm khởi tạo sự kiện
    initEvent() {
        let me = this;

        // Gọi hàm đóng form
        me.iconCloseForm();
    }

    // Hàm đóng form add
    iconCloseForm() {
        let me = this;

        me.form.find(".form_closeicon").off('click');
        me.form.find(".form_closeicon").on('click', e => {
            me.form.hide();
        });
    }

    // Hàm sự kiện toolbar của form
    initEventToolbar(param, id) {
        let me = this;

        me.form.find("[commandType]").off("click");
        me.form.find("[commandType]").on("click", function() {
            let commandType = $(this).attr("commandType");

            if(me[commandType] && typeof me[commandType] === "function") {
                me[commandType](this, param, id);
            }
        });
    }

    // Hàm lưu dữ liệu tạo mới nhân viên hoặc lưu dữ liệu mới của nhân viên
    save(control, param, id) {
        let me = this,
            isValid = me.validateForm();

        if(isValid) {
            let Data = me.getFormData();
                
            me.saveData(Data, param, id);
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

    // Hàm render phòng ban
    renderDepartmentForm(data) {
        let me = this;

        me.form.find("[setField = \"DepartmentID\"]").empty();
        data.data.filter(function(item) {
            let option = $("<option></option>");

            option.val(item.departmentID);
            option.text(item.departmentName);

            me.form.find("[setField = \"DepartmentID\"]").append(option);
        });
    }

    // Hàm render vị trí
    renderPositionForm(data) {
        let me = this;

        me.form.find("[setField = \"PositionID\"]").empty();
        data.data.filter(function(item) {
            let option = $("<option></option>");

            option.val(item.positionID);
            option.text(item.positionName);

            me.form.find("[setField = \"PositionID\"]").append(option);
        });
    }

    // hàm lấy dữ liệu trong form
    getFormData() {
        let me = this,
            data = {
                EmployeeCode: "",
                EmployeeName: "",
                Gender: 0,
                DateOfBirth: "2001-01-01",
                PhoneNumber: "",
                Email: "",
                PositionID: "",
                DepartmentID: "",
                Salary: 0,
                WorkStatus: 0,
                IdentifyNumber: "",
                TaxCode: "",
                CreatedBy: "Lợi",
                ModifiedBy: "Lợi",
                IdentifyIssuedPlace: "",
                IdentifyIssuedDate: "2001-01-01",
                TaxCode: "",
                JoinDate: "2001-01-01"
            };

        me.form.find("[setField]").each(function() {
            let setField = $(this).attr("setField");

            // Xử lý dữ liệu về đúng định dạng
            if(setField && $(this).val() != "") {
                if(setField == "Gender" || setField == "Salary" || setField == "WorkStatus") {
                    data[setField] = Number($(this).val());
                }
                else if(setField == "PhoneNumber") {
                    data[setField] = "(+84) " + $(this).val().slice(1);
                }
                else {
                    data[setField] = $(this).val();
                }
            }
        });
        return data;
    }

    // hàm lưu dữ liệu khi save
    saveData(data, param, id) {
        let me = this;

        // thực thi gọi Api post nếu formMode là thêm mới và nhân bản
        if(data && param.formMode === "Add" || param.formMode === "Replication") {
            me.postEmployee(data, param);
        }
        // Thực thi gọi Api update nếu formMode là cập nhật
        if(data && param.formMode === "Update" && id) {
            me.putEmployee(data, param, id);
        }
    }

    // Hàm gọi Api post
    postEmployee(data, param) {
        let me = this;

        CommonFn.Ajax(me.Url, resources.Method.Post, data, function(response, errormessage) {
            if(response) {
                param.parents.getData();
                alert("Tạo nhân viên thành công!");
                me.form.hide();
            }
            else {
                CommonFn.error(errormessage);
            }
        })
    }

    // hàm gọi Api put
    putEmployee(data, param, id) {
        let me = this;

        CommonFn.Ajax(me.Url + "/" + id, resources.Method.Put, data, function(response) {
            if(response) {
                param.parents.getData();
                alert("Chỉnh sửa nhân viên thành công!");
                me.form.hide();
            }
            else {
                CommonFn.error(errormessage);
            }
        })
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

    // Hàm mở form và thực thi reset form
    open(param) {
        let me = this;

        me.form.show();

        // Gọi các hàm resetForm
        if(param) {
            let resetFunc = "resetForm" + param.formMode;
            if(typeof me[resetFunc] === "function") {
                me[resetFunc](param);
            }
        }
    }

    // Hàm reset form them moi
    resetFormAdd(param) {
        let me = this;

        me.form.find("[setField]").each(function() {
            let DataType = $(this).attr("DataType") || "string",
                setFeild = $(this).attr("setField"),
                resetFuncName = "reset" + DataType;
            
            // Bỏ validate all khi mở lại form
            me.removeValidateForm(this);

            // Gán mã nhân viên tự động tăng và focus khi mở form
            if(setFeild === "EmployeeCode") {
                $(this).val(param.employeeCode);
                $(this).focus();
            }
            else {
                // Hàm gọi reset form by data
                if(me[resetFuncName] && typeof me[resetFuncName] === "function") {
                    me[resetFuncName](this);
                }
            }
        });
    }
    
    // Hàm reset form update
    resetFormUpdate(param) {
        let me = this;

        me.form.find("[commandType = \"save\"]").text("Lưu");
        if(param) {
            me.form.find("[setField]").each(function() {
                let setFeild = $(this).attr("setField");
    
                // Bỏ validate all khi mở lại form
                me.removeValidateForm(this);

                // Set focus cho ô mã nhân viên
                if(setFeild === "EmployeeCode") {
                    $(this).focus();
                }

                // Gọi hàm render data form
                me.renderDataForm(this, setFeild, param);
           })
        }
    }

    // Hàm reset form Nhân bản
    resetFormReplication(param) {
        let me = this;
        
        if(param) {
            me.form.find("[setField]").each(function() {
                let setFeild = $(this).attr("setField");
                
                // Bỏ validate all khi mở lại form
                me.removeValidateForm(this);
                
                // Gọi hàm render data form
                me.renderDataForm(this, setFeild, param);
            })
        }
    }

    // Hàm ghi dữ liệu vào form update
    renderDataForm(that, setFeild, param) {
        let me = this,
            type = $(that).attr("type");

        // Chuyển đổi giá trị setFeild map với dữ liệu trong data
        setFeild = setFeild.charAt(0).toLowerCase() + setFeild.slice(1);
        // Format lại data input
        if(setFeild === "phoneNumber") {
            param.data[setFeild] = "0" + param.data[setFeild].slice(5).trim();
        }
        else if(type === "date") {
            param.data[setFeild] = CommonFn.formatDateInput(param.data[setFeild]);
        }
        else if(param.formMode === "Replication" && setFeild === "employeeCode") {
            param.data[setFeild] = param.employeeCode;
        }

        $(that).val(param.data[setFeild]);
    }

    // Hàm bỏ validateForm
    removeValidateForm(control) {
        $(control).removeClass("validateForm");
        $(control).attr("title", "");
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

    // Hàm reset data date
    resetdate(control) {
        let me = this;

        control.value = new Date;
    }

}