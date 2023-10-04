import React, { useState, useEffect } from "react";
import { GetAxiosData } from "../api/ApiMethods";

function TreeView() {
    const [treeData, setTreeData] = useState([]);
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);

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
                    <div className="col-md mx-2 p-2 border bg-white rounded shadow" id="column1">
                        <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Brands</h5>
                        {treeData.map((brand) => (
                            <div key={brand.id} className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`parent-checkbox-${brand.id}`}
                                    checked={
                                        brand.models.every((model) =>
                                            model.variants.every((variant) => variant.isChecked)
                                        )
                                    }
                                    onChange={() => handleParentCheckboxChange(brand)}
                                />
                                <label
                                    className={` form-check-label tree-text clickable ${selectedParent && selectedParent.id === brand.id
                                        ? "selected-parent"
                                        : ""
                                        }`}
                                    onClick={() => selectParent(brand)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {brand.brand_name}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Column 2 */}
                    <div className="col-md  mx-2 p-2 border bg-white rounded shadow" id="column2">
                    <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Models</h5>
                        {selectedParent &&
                            selectedParent.models.map((model) => (
                                <div key={model.id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`child-checkbox-${model.id}`}
                                        checked={model.variants.every(
                                            (variant) => variant.isChecked
                                        )}
                                        onChange={() => handleChildCheckboxChange(model)}
                                    />
                                    <label
                                        className={` form-check-label tree-text clickable ${selectedChild && selectedChild.id === model.id
                                            ? "selected-parent"
                                            : ""
                                            }`}
                                        onClick={() => selectChild(model)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {model.model_name}
                                    </label>
                                </div>
                            ))}
                    </div>

                    {/* Column 3 */}
                    <div className="col-md border  mx-2 p-2  bg-white rounded shadow" id="column3">
                    <h5 className=" text-center my-2 text-bg-info p-2 rounded-2">Variants</h5>
                        {selectedChild &&
                            selectedChild.variants.map((variant) => (
                                <div key={variant.id} className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={`sub-child-checkbox-${variant.id}`}
                                        checked={variant.isChecked}
                                        onChange={() => handleChildCheckboxChange(variant)}
                                    />
                                    <label className="form-check-label" style={{ cursor: "pointer" }}>{variant.variant_name}</label>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TreeView;
