var resources = resources || {};

// DataTypes
resources.dataType = {
    Guid: "guid",
    Enum: "enum",
    Money: "money",
    Date: "date",
    Number: "number",
    Selected: "selected",
    String: "string"
}

// Enum
resources.Enum = {
    Gender: "Gender",
    WorkStatus: "WorkStatus"
}

// Datatype gender
resources.gender = {
    0: "Giới tính thứ 3",
    1: "Nam",
    2: "Nữ"
}

// DataType workstatus
resources.workStatus = {
    0: "Đang thử việc",
    1: "Đang làm việc",
    2: "Đã nghỉ việc",
    3: "Đã nghỉ hưu"
}

// CommandType toolbar
resources.CommandType = {
    Add: "add",
    Delete: "delete",
    Update: "update",
    Save: "save",
    Cancel: "cancel",
    Replication: "replication"
}

// method
resources.Method = {
    Get: "Get",
    Put: "Put",
    Post: "Post",
    Delete: "Delete"
}