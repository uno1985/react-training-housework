

function ProductModal({ modalType,
    tempProduct,
    productModalRef,
    closeModel,
    updateProduct,
    deleteProduct,
    copyProduct,
    productInputChange,
    productImageChange,
    addImage,
    removeImage,
    upLoadImage,
}) {

    return (
        < div className="modal fade" id="productModal" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="productModalLabel" aria-hidden="true" ref={productModalRef}>
            <div className="modal-dialog modal-xl">
                <div className="modal-content border-0">
                    <div className={`modal-header bg-dark text-white`}>
                        123
                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProductModal