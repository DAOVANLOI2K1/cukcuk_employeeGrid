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

        // Gọi hàm chứa sự kiện toolbar của form
        me.initEventToolbar();
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
    initEventToolbar(param) {
        let me = this;

        me.form.find("[commandType]").off("click");
        me.form.find("[commandType]").on("click", function() {
            let commandType = $(this).attr("commandType");

            if(me[commandType] && typeof me[commandType] === "function") {
                me[commandType](this, param);
            }
        });
    }

    // Hàm lưu dữ liệu tạo mới nhân viên
    save(control, param) {
        let me = this,
            isValid = me.validateForm();

        if(isValid) {
            let Data = me.getFormData();

            me.saveData(Data, param);
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
                DateOfBirth: "",
                PhoneNumber: "",
                Email: "",
                IdentifyNumber: "2904758291",
                PositionID: "",
                DepartmentID: "",
                Salary: 0,
                WorkStatus: 0,
                TaxCode: "12341235236",
                CreatedBy: "nam",
                ModifiedBy: "linh",
                IdentifyIssuedPlace: "Hà nội"
            };

        me.form.find("[setField]").each(function() {
            let setField = $(this).attr("setField");

            if(setField) {
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
    saveData(data, param) {
        let me = this;

        if(data) {
            CommonFn.Ajax(me.Url, resources.Method.Post, data, function(response) {
                if(response) {
                    param.parents.getData();
                    alert("Tạo nhân viên thành công!");
                    me.form.hide();
                }
                else {
                    alert("Tạo thất bại, hãy chỉnh sửa lại thông tin!");
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

        me.form.show();

        
        // Nếu thêm mới nhân viên thì reset form
        if(param && param.formMode === resources.CommandType.Add) {
            me.resetFormAdd();
        }
        
        // Nếu sửa nhân viên
        if(param && param.formMode === resources.CommandType.Update) {
            me.resetFormUpdate(param.data);
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

    // Hàm reset data date
    resetdate(control) {
        let me = this;

        control.value = new Date;
    }

    // Hàm reset form update
    resetFormUpdate(data) {
        let me = this;

       me.form.find("[setField]").each(function() {
            let setFeild = $(this).attr("setField").charAt(0) + ;

            $(this).val(data[setFeild]);
       })
    }
}