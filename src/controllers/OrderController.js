import Casual from 'casual';
import { v4 as uuidv4 } from 'uuid';
import OrderFake from '../models/schemas/OrderFake';






class OrderController {


    async orderGet(req, res) {

        const orders = await OrderFake.find();

        return res.json({
            orders_total: Casual.double(1000, 4000),
            order_count: Casual.integer(10, 20),
            sales_total: Casual.double(2000, 7000),
            sales_count: Casual.integer(10, 20),
            average_ticket: Casual.double(5000, 8000),
            orders: orders,
            has_more: Casual.boolean,
            limit: Casual.integer(10, 20),
            total_pages: Casual.integer(1, 1),
            page: Casual.integer(1, 1),
            total: Casual.integer(1, 14),
        });
    }



    async orderSeed(req, res) {



        for (var i = 0; i < 10; i++) {
            let fakee = OrderFake({
                _id: uuidv4(),
                status: Casual.word,
                customer: {
                    _id: uuidv4(),
                    name: Casual.name,
                    doc: Casual.word,
                    email: Casual.email,
                    phone: Casual.phone,
                },
                seller: {
                    id: uuidv4(),
                    name: Casual.name,
                    email: Casual.email,
                },
                payment: {
                    amount: Casual.integer(10, 20),
                    id: uuidv4(),
                    discount: Casual.integer(10, 20),
                    status: Casual.word,
                    method: Casual.word,
                    installments: parseInt(Casual.random * 7),
                    date: Casual.moment,
                },
                resume: {
                    amount: Casual.building_number,
                    original_amount: Casual.double(1000, 4000),
                    products_amount: Casual.double(1000, 4000),

                },
                delivery: {
                    address: {
                        line1: Casual.city,
                        line2: Casual.city,
                        line3: Casual.city,
                        neighborhood: Casual.address,
                        city: Casual.city,
                        state: Casual.state,
                        postal_code: Casual.postal_code,
                        country_code: Casual.country_code,

                    },
                    track_url: Casual.url,
                    status: Casual.word,
                    track_id: Casual._ip,
                    type: Casual.word,
                    amount: Casual.integer(10, 20),
                    delivery_forecast: Casual.moment,
                    history: {
                        address: {
                            line1: Casual.city,
                            line2: Casual.city,
                            line3: Casual.city,
                            neighborhood: Casual.address,
                            city: Casual.city,
                            state: Casual.state,
                            postal_code: Casual.postal_code,
                            country_code: Casual.country_code,

                        },
                        track_url: Casual.url,
                        status: Casual.word,
                        track_id: Casual._ip,
                        type: Casual.word,
                        amount: Casual.integer(10, 20),
                        delivery_forecast: Casual.moment,

                    },
                    products: [
                        {
                            id: uuidv4(),
                            seller_id: uuidv4(),
                            product_seller_id: uuidv4(),
                            name: Casual.name,
                            coupon: {
                                id: uuidv4(),
                                code: uuidv4(),
                                name: Casual.name,
                                discount: Casual.integer(10, 20),
                                type: Casual.word,
                            },
                            quantity: Casual.integer(10, 20),
                            sku: Casual.word,
                            status: Casual.word,
                            image: Casual.url,
                            amount: Casual.integer(10, 20),
                            total: Casual.double(1000, 4000)
                        }
                    ]
                }
            });
            await fakee.save((err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json(err);
                }
            });
        }



        return res.json('Order seed with success');

    }


}

export default new OrderController();
