
export abstract class Printer {
    protected printer: any;
    protected util: any;
    protected copy: number = 1;
    protected sum: number = 0;
    protected total: any = 0;
    protected products: any;
    protected esc = '\x1B';
    protected cmds: string = '';
    protected cut = '\x1d\x56\x41\x03';

    protected typePrinter: string;

    protected date: string;
    public pages: any;

    constructor() {
        this.addCmd('@')
        this.configDate()
        this.addCmd(this.date);
        this.newLine();
    }

    get default() {
        return 'default one';
    }


    get drivers() {
        return ' many drivers';
    }

    get all() {
        return 'all printers';
    }


    get page() {
        return this.cmds;
    }


    public configDate() {
        const date = new Date();
        this.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    public newLine(numberLine: number = 1) {
        for (let i = 0; i <= numberLine; i++) {
            this.addCmd('\x0A');
        }
        return this;
    }

    public addCmd(parans: string) {
        this.cmds += this.esc + parans;
        return this;
    }

    public setFontSize(value = 1) {
        const fonts = Array();
        fonts[0] = "\x00";
        fonts[1] = "\x01";
        fonts[3] = "\x04";
        fonts[10] = "\x10";
        fonts[12] = "\x12";
        fonts[14] = "\x14";
        fonts[16] = "\x16";
        fonts[18] = "\x18";
        fonts[22] = "\x22";
        fonts[38] = "\x38";
        return this.addCmd(`! ${fonts[value]}`);
    }

    public quote(text: string) {
        if(text) {
            text = text.toLowerCase();
            text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
            text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        }
        return text;
    }


    public execute(): any {
        for (let i = 0; i <= this.copy; i++) {
            console.log(this.cmds)
        }
        this.pages = this.cmds;
        this.cmds = '';

        return this.pages;
    }


   
}