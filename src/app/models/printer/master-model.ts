import { Printer } from './printer-model';

export class Master extends Printer  {
    

    public headers(options: any) 
    {
        this.copy = options.copy;
        this.setFontSize(38);
        this.addCmd( this.quote(options.company_name) );
        this.setFontSize(0);
        this.newLine(1).addCmd(`cnpj: ${options.company_cnpj}`);
        this.newLine(1).addCmd(`contato: ${options.company_phone}`).newLine(1);
        return this;
    }


    public setProducts(products: any[]) 
    {
        this.newLine();
        for( let product of products ) 
        {
            let tot = product.quantity * product.price;
            this.sum += tot;
            this.addCmd( this.quote(product.name) )
            .newLine()
            .addCmd(`R$ ${product.price}  ${product.quantity}  R$ ${tot}`)
            .newLine();
        }
       
        this.total += this.sum;
        return this;
    }

    public calcRateService(rateService: number) 
    {
        if(rateService)
        {
            let porcent = this.sum * rateService;
            porcent = porcent / 100;
            this.addCmd(`TAX ${rateService}%  R$${parseFloat(porcent.toFixed(2))}`);
            this.total += porcent;
        }
        
        this.newLine()
        return this;
    }

    public footer(order?: number) {
        this.addCmd(`subtotal: ${this.sum}`)
        .newLine(1)
        .addCmd(`total: ${parseFloat(this.total.toFixed(2))}`)
        .newLine(2)
        .addCmd(`#Pedido n: ${order}`)
        .setFontSize(0);

    }

    public build(req: any) 
    {
        this.headers(req.printer_options)
        .setFontSize(req.printer_options.font_size)
        .setProducts(req.products)
        .calcRateService(req.printer_options.rate_service)
        .footer(req.order);
        return this;
    }
    
}