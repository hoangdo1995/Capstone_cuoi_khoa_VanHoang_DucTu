import dayjs, { Dayjs } from "dayjs";

export interface LocationType {
    id:        number;
    tenViTri:  string;
    tinhThanh: string;
    quocGia:   string;
    hinhAnh:   string;
}

export interface RoomDetailType {
    id:       number;
    tenPhong: string;
    khach:    number;
    phongNgu: number;
    giuong:   number;
    phongTam: number;
    moTa:     string;
    giaTien:  number;
    mayGiat:  boolean;
    banLa:    boolean;
    tivi:     boolean;
    dieuHoa:  boolean;
    wifi:     boolean;
    bep:      boolean;
    doXe:     boolean;
    hoBoi:    boolean;
    banUi:    boolean;
    maViTri:  number;
    hinhAnh:  string;
}

export interface CommentType {
    ngayBinhLuan:     string;
    noiDung:          string;
    saoBinhLuan:      number;
    tenNguoiBinhLuan: string;
    avatar:           string;
}

export interface BookRoomType {
    id:           number;
    maPhong:      number;
    ngayDen:      string|undefined;
    ngayDi:       string|undefined;
    soLuongKhach: number;
    maNguoiDung:  number;
}

export interface DaySelectType {
    startDay:string|undefined,
    endDay:string|undefined,
    rangeDay:number|undefined
  }

