var CommonFn = CommonFn || {};

// Hàm format số tiền
CommonFn.formatMoney = money => {
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}

// Format ngày tháng
CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}

// Format ngày tháng cho input date
CommonFn.formatDateInput = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// Hàm ajax
CommonFn.Ajax = (url, method, data, fnCallBack, async = true) => {
    $.ajax({
        url: url,
        method: method,
        async: async,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
        crossDomain: true,
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            fnCallBack(response, null);
        },
        error: function (errormessage) {
            console.log(errormessage.responseText);
            fnCallBack(null, errormessage.responseText);
        }
    })
}

// Hàm show lỗi 
CommonFn.error = message => {
    if(message === "e003") {
        alert("Tạo thất bại do trùng mã nhân viên!");
    }
    if(message === "{\"type\":\"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\"title\":\"One or more validation errors occurred.\",\"status\":400,\"traceId\":\"00-99e69795012bdd93f4232bbb32cf3c59-24c952f11d27b517-00\",\"errors\":{\"Email\":[\"e009\"]}}") {
        alert("Tạo thất bại do Email không chính xác!");
    }
    else {
        alert("Tạo thất bại, hãy chỉnh sửa lại thông tin!");
    }
}