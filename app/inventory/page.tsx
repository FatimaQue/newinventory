import ProductTable from "../components/inventory-details";
import Sidebar from "../components/sidebar";

export default async function InventoryPage(){
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar currentPath="/inventory" />
<main className="ml-64 p-8">
<ProductTable/>
</main>
        </div>

    );
        
    
}