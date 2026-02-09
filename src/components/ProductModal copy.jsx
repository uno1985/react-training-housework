

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
                    <div className={`modal-header bg-${modalType === 'delete' ? 'danger' : 'dark'} text-white`}>
                        <h5 id="productModalLabel" className="modal-title">
                            <span>{modalType === 'delete' ? '刪除' : (modalType === 'edit' ? '編輯' : '新增')}產品</span>
                        </h5>
                        <button
                            type="button"
                            className="btn-close btn-white"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => closeModel()}

                        ></button>
                    </div>


                    <div className="modal-body">
                        {
                            modalType === 'delete' ? (<p className="fs-4">
                                確定要刪除
                                <span className="text-danger">{tempProduct.title}</span>嗎？
                            </p>) : (
                                <div className="row  text-start">
                                    <div className="col-sm-4">
                                        <div className="mb-3">
                                            <label htmlFor="fileUpload" className="form-label">
                                                上傳主要圖片
                                            </label>
                                            <input className="form-control" type="file" name="fileUpload" id="fileUpload" value="" accept=".jpg,.jpeg,.png"
                                                onChange={(e) => upLoadImage(e)} />

                                        </div>







                                        <div className="mb-2">
                                            <div className="mb-3">
                                                <label htmlFor="imageUrl" className="form-label">
                                                    輸入主要圖片網址
                                                </label>
                                                <input
                                                    type="text"
                                                    id="imageUrl"
                                                    name="imageUrl"
                                                    className="form-control"
                                                    placeholder="請輸入圖片連結"
                                                    value={tempProduct.imageUrl}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                            {
                                                tempProduct.imageUrl && (
                                                    <img className="img-fluid" src={tempProduct.imageUrl} alt="主圖" />
                                                )
                                            }

                                        </div>
                                        <div>

                                            {
                                                tempProduct.imagesUrl.map((url, index) =>
                                                (
                                                    <div key={index}>
                                                        <label htmlFor="imageUrl" className="form-label">
                                                            輸入圖片網址
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={url}
                                                            placeholder={`圖片網址${index + 1}`}
                                                            onChange={(e) => productImageChange(index, e.target.value)}
                                                        />
                                                        {
                                                            url && <img
                                                                className="img-fluid"
                                                                src={url}
                                                                alt={`副圖${index + 1}`}
                                                            />
                                                        }

                                                    </div>
                                                ))
                                            }
                                            {
                                                tempProduct.imagesUrl.length < 5 &&
                                                <button className="btn btn-outline-primary btn-sm d-block w-100" onClick={() => addImage()}>
                                                    新增圖片
                                                </button>
                                            }


                                        </div>
                                        <div>
                                            {
                                                tempProduct.imagesUrl.length > 1 &&
                                                <button className="btn btn-outline-danger btn-sm d-block w-100" onClick={() => removeImage()}>
                                                    刪除圖片
                                                </button>
                                            }

                                        </div>
                                    </div>
                                    <div className="col-sm-8 ">
                                        <div className="row">
                                            <div className="mb-3 col-md-8">
                                                <label htmlFor="title" className="form-label">標題</label>
                                                <input
                                                    name="title"
                                                    id="title"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="請輸入標題"
                                                    value={tempProduct.title}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-4">
                                                <label htmlFor="evaluate" className="form-label">商品評價</label>
                                                <select className="form-select" name="evaluate" aria-label="Default select example" value={tempProduct.evaluate} onChange={(e) => productInputChange(e)}>
                                                    <option value="" disabled> 請選擇商品評價</option>

                                                    {
                                                        Array.from({ length: 5 }).map((_, index) => {
                                                            const num = index + 1;
                                                            return (
                                                                <option value={num} key={num}>{num}</option>
                                                            )
                                                        })
                                                    }

                                                </select>

                                            </div></div>

                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="category" className="form-label">分類</label>
                                                <input
                                                    name="category"
                                                    id="category"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="請輸入分類"
                                                    value={tempProduct.category}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="unit" className="form-label">單位</label>
                                                <input
                                                    name="unit"
                                                    id="unit"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="請輸入單位"
                                                    value={tempProduct.unit}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="origin_price" className="form-label">原價</label>
                                                <input
                                                    name="origin_price"
                                                    id="origin_price"
                                                    type="number"
                                                    min="0"
                                                    className="form-control"
                                                    placeholder="請輸入原價"
                                                    value={tempProduct.origin_price}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="price" className="form-label">售價</label>
                                                <input
                                                    name="price"
                                                    id="price"
                                                    type="number"
                                                    min="0"
                                                    className="form-control"
                                                    placeholder="請輸入售價"
                                                    value={tempProduct.price}
                                                    onChange={(e) => productInputChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">產品描述</label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                className="form-control"
                                                placeholder="請輸入產品描述"
                                                value={tempProduct.description}
                                                onChange={(e) => productInputChange(e)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="content" className="form-label">說明內容</label>
                                            <textarea
                                                name="content"
                                                id="content"
                                                className="form-control"
                                                placeholder="請輸入說明內容"
                                                value={tempProduct.content}
                                                onChange={(e) => productInputChange(e)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input
                                                    name="is_enabled"
                                                    id="is_enabled"
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={tempProduct.is_enabled}
                                                    onChange={(e) => productInputChange(e)}

                                                />
                                                <label className="form-check-label" htmlFor="is_enabled">
                                                    是否啟用
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div >
                            )
                        }


                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => closeModel()}
                        >
                            取消
                        </button>
                        {
                            modalType === 'delete' ? (<button type="button" className="btn btn-danger" onClick={() => deleteProduct(tempProduct.id)} >刪除</button>) : (<button type="button" className="btn btn-primary" onClick={() => updateProduct(tempProduct.id)} >確認</button>)
                        }
                        {
                            modalType === 'edit' && <button type="button" className="btn btn-warning" onClick={() => copyProduct(tempProduct.id)} >複製</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )

}
export default ProductModal