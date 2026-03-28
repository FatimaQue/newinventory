
import AddProductPage from "../components/addproducts";
import Sidebar from "../components/sidebar";

export default async function InventoryPage(){
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
<main className="ml-64 p-8">
<AddProductPage/>
</main>
        </div>

    );
        
    
}