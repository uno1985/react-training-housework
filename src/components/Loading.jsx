function Loading({ isLoading }) {

    if (!isLoading) return null;
    return (
        <>
            {
                isLoading && <div
                    className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center bg-light"
                    style={{ zIndex: 9999, opacity: '85%' }}
                >
                    <div className="text-center">
                        <div className="spinner-border text-dark" role="status"></div>
                        <h2 className="mt-2">處理中，請稍候...</h2>
                    </div>
                </div>
            }
        </>
    )
}
export default Loading