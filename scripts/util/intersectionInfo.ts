class IntersectionInfo {
    public x : number = 0;
    public y : number = 0;
    public t : number = 0;
    public rx : number = 0;
    public ry : number = 0;
    public obj1 : any;
    public obj2 : any;
    public isTrigger : boolean = false;
    public beforeDirX : number = 0;
    public beforeDirY : number = 0;

    constructor( ) {
    }

    setInfo( x : number, y : number, t : number ) {
        this.x = x;
        this.y = y;
        this.t = t;
    }
}
export default IntersectionInfo;
