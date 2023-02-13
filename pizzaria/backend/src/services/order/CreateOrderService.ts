import prismaClient from "../../prisma";

interface OrderREquest{
    table:number;
    name:string;
}

class CreateOrderService{
    async execute({table, name }: OrderREquest){

        const order = await prismaClient.order.create({
            data:{
                table: table,
                name: name
            }
        })

        return order;

    }

}

export { CreateOrderService }