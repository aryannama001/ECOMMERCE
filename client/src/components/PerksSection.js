import React from 'react';

// import freeShippingSvg from '../images/free-shipping.svg';
// import easyReturnsSvg from '../images/easy-returns.svg';
// import qualityGuaranteeSvg from '../images/quality-guarantee.svg';
// import customerSupportSvg from '../images/customer-support.svg';
// import fastDeliverySvg from '../images/fast-delivery.svg';

const PerksSection = () => {
    return (
        <section className="bg-gray-100 py-8 ">
            <div className="container mx-auto px-8">
                <div className="flex flex-wrap  justify-between py-24 items-center">

                    <div className="flex flex-col items-center space-x-4">
                        <img src='/images/icon-returns-light.svg' alt="Free Shipping" className="w-24 h-24" />
                        <div>
                            <h3 className="text-lg text-center font-medium mb-2">Easy Returns</h3>
                            <p className="text-gray-600 text-center">Hassle-free returns within 30 days</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-x-4">
                        <img src='/images/icon-planet-light.svg' alt="Free Shipping" className="w-24 h-24" />

                        <div>
                            <h3 className="text-lg font-medium mb-2 text-center">Quality Guarantee</h3>
                            <p className="text-gray-600 text-center">We stand behind the quality of our products</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-x-4">
                        <img src='/images/icon-gift-card-light.svg' alt="Free Shipping" className="w-24 h-24" />

                        <div>
                            <h3 className="text-lg font-medium mb-2 text-center">Customer Support</h3>
                            <p className="text-gray-600 text-center">Friendly and knowledgeable customer service</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-x-4">
                        <img src='/images/icon-calendar-light.svg' alt="Free Shipping" className="w-24 h-24" />

                        <div>
                            <h3 className="text-lg font-medium mb-2 text-center">Fast Delivery</h3>
                            <p className="text-gray-600 text-center">Quick and reliable delivery options</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PerksSection;
