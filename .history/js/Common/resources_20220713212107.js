var resources = resources || {};

// DataTypes
resources.dataType = {
    Enum: "enum",
    Money: "money",
    Date: "date",
    Number: "number",
    Selected: "selected",
    String: "string"
}

// Datatype gender
resources.gender = {
    1: "Nam",
    2: "Nữ",
    0: "Giới tính thứ 3"
}

// DataType workstatus
resources.workStatus = {
    0: "Đang thử việc",
    1: "Đang làm việc",
    2: "Đã nghỉ việc"
}

// CommandType toolbar
resources.CommandType = {
    Add: "add",
    Delete: "delete",
    Update: "update",
    Save: "save",
    Cancel: "cancel"
}

// method
resources.Method = {
    Get: "Get",
    Put: "Put",
    Post: "Post",
    Delete: "Delete"
}