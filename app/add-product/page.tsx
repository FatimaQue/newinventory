
import AddProductPage from "../components/addproducts";
import Sidebar from "../components/sidebar";

export default async function InventoryPage(){
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
<main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:p-8">
<AddProductPage/>
</main>
        </div>

    );
        
    
}