import React, { useState, useEffect } from "react";
import { GetAxiosData } from "../api/ApiMethods";
import CheckBoxItems from "./CheckBoxItems";

function TreeView() {
    const [treeData, setTreeData] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);

    useEffect(() => {
        const apiUrl = "/camera";
        GetAxiosData(apiUrl)
            .then((response) => {
                setTreeData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const selectParent = (parentItem) => {
        setSelectedParent(parentItem);
        setSelectedChild(null);
    };

    const selectChild = (childItem) => {
        setSelectedChild(childItem);
    };
    const selectVariant = (variantItem) => {
        setSelectedVariant(variantItem)
    }
    const handleParentCheckboxChange = (parentItem) => {
        const updatedTreeData = treeData.map((brand) => {
            if (brand.id === parentItem.id) {
                brand.models.forEach((model) => {
                    model.variants.forEach((variant) => {
                        variant.isChecked = !parentItem.isChecked;
                    });
                    model.isChecked = !parentItem.isChecked;
                });
                brand.isChecked = !parentItem.isChecked;
            }
            return brand;
        });
        setTreeData(updatedTreeData);
    };

    const handleChildCheckboxChange = (childItem) => {
        const updatedTreeData = treeData.map((brand) => {
            brand.models.forEach((model) => {
                if (model.id === childItem.id) {
                    model.variants.forEach((variant) => {
                        variant.isChecked = !childItem.isChecked;
                    });
                }
                model.variants.forEach((variant) => {
                    if (variant.id === childItem.id) {
                        variant.isChecked = !variant.isChecked;
                    }
                });
                const allVariantsSelected = model.variants.every((variant) => variant.isChecked);
                model.isChecked = allVariantsSelected;

                return model;
            });
            const allModelsSelected = brand.models.every((model) => model.isChecked);
            brand.isChecked = allModelsSelected;

            return brand;
        });
        setTreeData(updatedTreeData);
    };

    return (
        <div className="treeview">
            <div className="container">
                <div className="row mt-5 mx-2 p-4 bg-white border border-primary rounded shadow">
                    {/* Column 1 */}
                    <div className="col-md mx-2 p-3 border bg-white rounded shadow" id="column1">
                        <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Brands</h5>
                        {treeData.map((brand) => (
                            <CheckBoxItems
                                key={brand.id}
                                id={`parent-checkbox-${brand.id}`}
                                isChecked={brand.models.every((model) =>
                                    model.variants.every((variant) => variant.isChecked)
                                )}
                                onChange={() => handleParentCheckboxChange(brand)}
                                label={brand.brand_name}
                                onClick={() => selectParent(brand)}
                                borderClass={selectedParent === brand ? " border border-success" : ""}
                            />
                        ))}
                    </div>
                    {/* Column 2 */}
                    <div className="col-md  mx-2 p-2 border bg-white rounded shadow" id="column2">
                        <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Models</h5>
                        {selectedParent &&
                            selectedParent.models.map((model) => (
                                <CheckBoxItems
                                    key={model.id}
                                    id={`child-checkbox-${model.id}`}
                                    isChecked={model.variants.every((variant) => variant.isChecked)}
                                    onChange={() => handleChildCheckboxChange(model)}
                                    label={model.model_name}
                                    onClick={() => selectChild(model)}
                                    borderClass={selectedChild === model ? " border border-success" : ""}
                                />
                            ))}
                    </div>
                    {/* Column 3 */}
                    <div className="col-md border  mx-2 p-2  bg-white rounded shadow" id="column3">
                        <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Variants</h5>
                        {selectedChild &&
                            selectedChild.variants.map((variant) => (
                                <CheckBoxItems
                                    key={variant.id}
                                    id={`sub-child-checkbox-${variant.id}`}
                                    isChecked={variant.isChecked}
                                    onChange={() => handleChildCheckboxChange(variant)}
                                    label={variant.variant_name}
                                    onClick={() => selectVariant(variant)}
                                    borderClass={selectedVariant === variant ? " border border-success" : ""}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TreeView;
