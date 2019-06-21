import { Printer } from './printer-model';

export class Prepare extends Printer  {
    public headers(options: any, order: number): any {
        this.copy = options.copy_prepare;
        this.setFontSize(38);
        this.addCmd('Preparo'.toUpperCase())
        this.newLine(1).addCmd(`Pedido: ${order}`.toUpperCase()).newLine(1);
        this.setFontSize(0);
        
        return this;
    }


    public setProducts(products: any): any {
        this.newLine();
        for( let product of products ) 
        {
            this.sum += product.quantity * product.price;
            this.addCmd( product.quantity+ ' : ' )
            this.addCmd( this.quote(product.name) )
            .newLine()
        }
       
        this.total += this.sum;
        return this;
    }
    
    public footer(client: any) {
        this.setFontSize(0)
    }

    public build(req: any) 
    {
        this.headers(req.printer_options, req.order)
        .setFontSize(req.printer_options.font_size)
        .setProducts(req.products)
        .footer(req.client);
        return this;
    }
}