//一些公共的类

//FastAPI请求成功后回来的数据集信息
export class TDataInfo {
    iTotal: number = 0; //如果有分页的情况,代表总记录数
    iData: number = 0;  //代表返回几个数据集
    iPageIndex: number = 0;  //代表当前第几页
    iPageSize: number = 0; //代表每页最大条数
    iRow: number = 0; //当前数据有几条
    datas: any = []; //当前数据
}
//FastAPI请求参数集合
export class TFastApiRequest {
    public moduleCode: string = "";
    public moduleDatas: any = {};
    public moduleParams: any = {};
    public pageIndex: number = 0;
    public pageSize: number = 0;
    public dbCode: string = "";
    public initInfo() {
        this.moduleCode = "";
        this.moduleDatas = {};
        this.moduleParams = {};
        this.pageIndex = 0;
        this.pageSize = 0;
        this.dbCode = "";
    }
}

export interface IResult<T> {
    resultSuccess: boolean;
    resultCode: string;
    resultMsg: string;
    resultData: T;
    resultFormat: string;
}

//结果集
export class TResult {
    public resultSuccess: boolean = false;
    public resultCode: string = "";
    public resultMsg: string = "";
    public resultData: any = null;
    public resultFormat: string = "json"; //string(字符串),jsonstring(JSON格式字符串),json(json);
    static createNew(): TResult {
        return new TResult();
    }
    public getDataInfo(qDataName: string = "data1"): TDataInfo {
        let lDataInfo = new TDataInfo();
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 1) {
            tempInfo = this.resultData[lKeys[0]];
        } else {
            tempInfo = this.resultData[qDataName];
        }
        lDataInfo.iTotal = tempInfo.iTotal;
        lDataInfo.iData = tempInfo.iData;
        lDataInfo.iPageIndex = tempInfo.iPageIndex;
        lDataInfo.iPageSize = tempInfo.iPageSize;
        lDataInfo.iRow = tempInfo.iRow;
        lDataInfo.datas = tempInfo.datas;
        return lDataInfo;
    }
    public getData(qDataName: string = "data1"): any {
        let lDataInfo = new TDataInfo();
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 1) {
            tempInfo = this.resultData[lKeys[0]];
        } else {
            tempInfo = this.resultData[qDataName];
        }
        return tempInfo["datas"];
    }
    public getDataIndex(qIndex: number = 0): any {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let lDataInfo = new TDataInfo();
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length < qIndex + 1) {
            throw "数据集总共:" + lKeys.length;
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        return tempInfo["datas"];
    }
    public getFirstRow(qIndex: number = 0): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空"
            return;
        }
        tempInfo = this.resultData[lKeys[qIndex]];
        let lFirst = tempInfo["datas"];
        return lFirst[0];
    }
    public getFirstValue(): any {
        let tempInfo;
        let lKeys = [];
        for (var key in this.resultData) {
            lKeys.push(key);//Type, Height
        }
        if (lKeys.length == 0) {
            throw "返回数据为空"
            return;
        }
        tempInfo = this.resultData[lKeys[0]];
        let lFirst = tempInfo["datas"];
        lFirst = lFirst[0];
        let lFirstKey = "";
        for (var key in lFirst) {
            return lFirst[key];
        }
    }
    //上传文件返回来的文件信息
    public getFileReturn(qIndex: number = 0): TFileReturn {
        if (qIndex < 0) {
            qIndex = 0;
        }
        let lFileReturn: TFileReturn;
        let lResultArry = this.resultData as [];
        if (lResultArry.length >= qIndex) {
            lFileReturn = lResultArry[qIndex];
            return lFileReturn;
        } else {
            return new TFileReturn();
        }
    }
    //
    public getDataT<T>(): IResult<T> {
        return this as IResult<T>;
    }
}

//
export class TBaseUser {
    FUserCode: string = "";
    FUserName: string = "";
    FUserTel: string = "";
    FUserPass: string = "";
    FUserMail: string = "";
    FUserBirthday: string = "";
    FUserSex: string = "";
}

export class TFileReturn {
    fileID: string = "";
    fileName: string = "";
    filePath: string = "";
    httpUrl: string = "";
    fileType: string = "";
    fileSize: number = 0;
    jobID: string = "";
    detailID: string = "";
}


export const constHelper = {
    TMyOpenMode: [{
        "value": "openData",
        "label": "跟据SQL打开数据"
    },
    {
        "value": "openTable",
        "label": "跟据表名打开数据"
    },
    {
        "value": "doStored",
        "label": "执行存储过程"
    }, {
        "value": "doSQLStored",
        "label": "跟据SQL执行存储过程"
    },
    {
        "value": "doDML",
        "label": "执行DML语句"
    },
    {
        "value": "doSave",
        "label": "保存数据"
    }
    ],
    TMyDataType: [{
        "value": "字符串",
        "label": "字符串"
    }, {
        "value": "数字",
        "label": "数字"
    }, {
        "value": "时间",
        "label": "时间"
    }, {
        "value": "布尔",
        "label": "布尔"
    }],
    TMyDataJsonFormat: [{
        "value": "jsonObject",
        "label": "json对象"
    },
    {
        "value": "jsonArray",
        "label": "json数组"
    }
    ],
    TMyFilterExpression: [{
        "value": "=",
        "label": "等号"
    }, {
        "value": ">",
        "label": "大于"
    }, {
        "value": "<",
        "label": "小于"
    }, {
        "value": ">=",
        "label": "大于等于"
    }, {
        "value": "<=",
        "label": "小于等于"
    }, {
        "value": "in",
        "label": "包含"
    }, {
        "value": "notin",
        "label": "不包含"
    }, {
        "value": "like",
        "label": "相似"
    }, {
        "value": "likeL",
        "label": "左相似"
    }, {
        "value": "likeR",
        "label": "右相似"
    }],
    TMyValueDefaultType: [{
        "value": "json值",
        "label": "json值"
    },
    {
        "value": "系统值",
        "label": "系统值值"
    },
    {
        "value": "token信息",
        "label": "token信息"
    },
    {
        "value": "默认值",
        "label": "默认值"
    },
    {
        "value": "SQL取值",
        "label": "SQL取值"
    },
    {
        "value": "步骤取值",
        "label": "步骤取值"
    }],
    TMyValueDefaultValue: [{
        "value": "GUID32",
        "label": "取GUID"
    },
    {
        "value": "UnionID",
        "label": "执行ID"
    },
    {
        "value": "TokenID",
        "label": "token信息ID"
    },
    {
        "value": "TokenUserID",
        "label": "用户信息ID"
    },
    {
        "value": "TokenTryUserID",
        "label": "用户信息ID可为空"
    },
    {
        "value": "TokenUserName",
        "label": "用户信息名称"
    },
    {
        "value": "TokenFaceAuthor",
        "label": "人脸授权"
    }],
    TMYDBType: [{
        "value": "sqlserver",
        "label": "微软数据库"
    }, {
        "value": "mysql",
        "label": "mysql数据库"
    },
    {
        "value": "sqlite",
        "label": "sqlite数据库"
    },
    {
        "value": "oracle",
        "label": "oracle数据库"
    },
    {
        "value": "postgresql",
        "label": "pg数据库"
    }],
    TMYFileYMDRoot: [{
        "value": "YMD",
        "label": "格式20210605"
    }, {
        "value": "Y",
        "label": "格式2021"
    },
    {
        "value": "YM",
        "label": "格式202106"
    },
    {
        "value": "YMDH",
        "label": "格式20210615"
    },
    {
        "value": "NONE",
        "label": "无格式"
    }]

}

//*********模板信息**********//
export class TModuleField {
    public FFieldID: string = "";
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 0;
    public FFieldName: string = "";
    public FFieldJsonName: string = "";
    public FFieldCaption: string = "";
    public FFieldDataType: string = "字符串";
    public FFieldSiz: number = 0;
    public FFieldPrecision: number = 0;
    public FFieldProvidFlag: string = "";
    public FFieldDefaultType: string = "";
    public FFieldDefaultValue: string = "";
    public FFieldFormat: string = "";
    public FFieldNullValue: string = "";
    public myTempID: string = "";
}

export class TModuleFilter {
    public FFilterID: string = "";
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 1;
    public FFilterName: string = "";
    public FFilterJsonName: string = "";
    public FFilterCaption = "新建条件";
    public FFilterField: string = "";
    public FFilterDataType = "字符串";
    public FFilterExpression = "=";
    public FFilterFormat: string = "";
    public FFilterbMust: boolean = false;
    public FFilterbValue: boolean = false;
    public FFilterDefaultType: string = "";
    public FFilterDefaultValue: string = "";
    public FFilterSQL = "";
    public FbOutParam: boolean = false;
    public FOutTrueValue: string = "";
    public FIsOutMsg: boolean = false;
    public myTempID = "";
}

export class TModuleDataSet {
    public FDataID: string = "";
    public FModuleID: string = "";
    public FOrderNo: number = 1;
    public FDataName: string = "";
    public FDataCaption = "新建数据";
    public FDataZTCode: string = "";
    public FDataSQL: string = "";
    public FDataOpenMode = "openData";
    public FDataTableName: string = "";
    public FDataPrimaryKey: string = "";
    public FDataPageSize: number = 0;
    public FDataJsonFormat: string = "";
    public FMaxAffectRows: number = 0;
    public FMustAffectRows: number = 0;
    public fieldList: TModuleField[] = [];
    public filterList: TModuleFilter[] = []
    public myTempID = "";
};

export class TModuleFileSet {
    public FSetID: string = "";
    public FOrderNo: number = 0;
    public FFielCode: string = "";
    public FPhysicalPath: string = "";
    public FIsWeb = true;
    public FIsUse = true;
    public FAutoYMDRoot = "YMD";
    public FIsDefault: boolean = false;
    public FDBCode: string = "";
    public FTableName: string = "";
    public FFileIDField: string = "";
    public FFileNameField: string = "";
    public FFileTypeField: string = "";
    public FFileSizeField: string = "";
    public FFilePathField: string = "";
    public FFileTimeField: string = "";
    public FJobField: string = "";
    public FDetailField: string = "";
    public FRemark: string = "";
}
export class TModuleBase {
    public FModuleID: string = "";
    public FPModuleID: string = "";
    public FTreeCode: string = "";
    public FModuleCode = "接口代码";
    public FModuleCaptoin: string = "";
    public FModuleAuthor: string = "";
    public FbUse = true;
};
export class TModuelInfo {
    public moduleBase: TModuleBase = new TModuleBase();
    public moduleDataList: TModuleDataSet[] = [];
    public delIDs: string[] = [];
}
//*********数据库或账套信息 *************/
export class TDBInfo {
    public dbCode: string = "新建代码"; //数据库代码 必需，每个连接一个代码且不能重复 全小写
    public dbType: string = "sqlserver"; //数据库类型 sqlserver|mysql|sqlite|oracle|postgresql  必需
    public dbVersin: string = "2019"; //数据库版本;可以不管
    //数据库连接字符串 以SQLSERVER为例其它参考 https://www.donet5.com/Doc/1/1218 数据库特色
    public connectionString: string = "server=XXX;uid=XX;pwd=XXX;database=XXX"; //数据库连接字符串必需，
    public initPool: number = 0; //待扩展
    public maxPool: number = 0;
    public tempID: string = "";
}
export class TZTInfo {
    public ztCode: string = ""; //账套 必需;每个账套一个代码 且不能重复 全小写
    public masterDBCode: string = ""; //挂勾的主数据库 数据库代码
    public slaveDBCodeList: string[] = [];//从数据库["mssql1";"mssql2";"mssql3"] 这样。
    public tempID = ""
}
export class TDBHelper {
    public dbList: TDBInfo[] = [];
    public ztList: TZTInfo[] = [];
    public mainZTCode: string = "";
    public adminZTCode: string = "";
}
//
export class TLogSet {
    public logHTTP: string = "0"; //是否记录HTTP日记
    public logSQL: string = "0"; //是否记录SQL日记
    public logToDB: string = "0"; //是否把日记写到SQL
    public logDBCode: string = ""; //日记账套
}
//函数类型定义
export type evenDataSetIndexChange = (qDataSet: TModuleDataSet) => void; //事件回调
export type evenDels = (qID: string) => void; //事件回调
