import React, { useState, useEffect } from "react";
import { GetAxiosData } from "../api/ApiMethods";

const TreeView = () => {
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);

    useEffect(() => {
        GetAxiosData("/").then((response) => {
            setBrands(response.data);
        });
    }, []);

    const handleBrandClick = (brand) => {
        setSelectedBrand(brand);
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <h3 className="text-center">Brands</h3>
                        <div>
                            {brands.map((brand) => (
                                <div className="form-check" key={brand.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        // checked={selectedBrand === brand}
                                        value={brand.brand_name}
                                        id={`brand_${brand.id}`}
                                        onChange={() => handleBrandClick(brand)}
                                    />
                                    <label className="form-check-label" htmlFor={`brand_${brand.id}`}>
                                        {brand.brand_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3 className="text-center">Models</h3>
                        <div>
                            {selectedBrand && selectedBrand.models.map((model) => (
                                <div className="form-check" key={model.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        // checked={selectedModel === model}
                                        value={model.model_name}
                                        id={`model_${model.id}`}
                                        onChange={() => handleModelClick(model)}
                                    />
                                    <label className="form-check-label" htmlFor={`model_${model.id}`}>
                                        {model.model_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <h3 className="text-center">Variants</h3>
                        <div>
                            {selectedModel && selectedModel.variants.map((variant) => (
                                <div className="form-check" key={variant.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={variant.variant_name}
                                        id={`variant_${variant.id}`}
                                    />
                                    <label className="form-check-label" htmlFor={`variant_${variant.id}`}>
                                        {variant.variant_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TreeView;
