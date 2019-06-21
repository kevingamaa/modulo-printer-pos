import { Printer } from './printer-model';

export class Delivery extends Printer  {

    public headers(options: any, order: number): Delivery {
        this.copy = options.copy_delivery;
        this.setFontSize(38);
        this.addCmd('Entrega')
        this.newLine(1).addCmd(`Pedido: ${order}`).newLine(1);
        this.setFontSize(0);
        
        return this;
    }

    public setProducts(products: any): Delivery {
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

    public setFreight(freight: any) {
        freight = parseFloat(freight);
        this.total += freight;
        this.addCmd(`FRETE: R$ ${freight}`).newLine()
    }

    public footer(client: any) {
        if(client)
        {
            this.addCmd(`Nome: ${this.quote(client.name)}`)
            .newLine()
            .addCmd(`Endereço: ${this.quote(client.address_street)} N: ${client.address_number}`)
            .newLine()
            .addCmd(`Bairro: ${this.quote(client.address_neightborhood )}`)
            .newLine()
            .addCmd(`Referencia: ${this.quote( client.reference_point )}`)
        }
        this.setFontSize(0);
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