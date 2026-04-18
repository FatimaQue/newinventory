
import { getCurrentUser } from "@/lib/auth";
import Sidebar from "../components/sidebar";
import {prisma} from "@/lib/prisma"
import {TrendingUp } from 'lucide-react'
import ProductAreaChart from "../components/products-chart";
import ProductsDonutChart from "../components/products-donut-chart";

export default async function DashboardPage(){


    return <div className="min-h-screen bg-gray-50"><Sidebar/>
    <main className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:p-8">
        <div className="mb-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">DashBoard</h1>
                    <p className="text-sm text-gray-500">Welcome back Here is an overview of your Inventory.</p></div></div></div>

                    {/* Top row: Key Metrics + Growth Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                            <h1 className="text-lg font-semibold text-gray-900 mb-6">Key Metrics</h1>
                            <div className="grid grid-cols-3 gap-3 sm:gap-6">
                                <div className="text-center"><div className="twxt-3xl font-bold text-gray-900">25</div>
                                <div className="text-sm text-gray-600">
                                    Total Products</div>
                                    <div className="flex items-center justify-center mt-1"><span className="text-xs text-green-600 ">+25</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" /></div>
                                    </div>
                                     <div className="text-center"><div className="twxt-3xl font-bold text-gray-900">1590</div>
                                <div className="text-sm text-gray-600">
                                    Total Values</div>
                                    <div className="flex items-center justify-center mt-1"><span className="text-xs text-green-600 ">+12</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" /></div>
                                    </div>
                                     <div className="text-center"><div className="twxt-3xl font-bold text-gray-900">5</div>
                                <div className="text-sm text-gray-600">
                                    Low Stock</div>
                                    <div className="flex items-center justify-center mt-1"><span className="text-xs text-green-600 ">+27</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1" /></div>
                                    </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-200">
                            <ProductAreaChart/>
                        </div>
                    </div>

                    {/* Bottom row: Stock Levels + Donut Chart */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-9">Stock Levels</h2>
                                </div>
                                <div className="flex flex-col space-y-4 p-4 rounded-lg bg-gray-50 w-full">

  {/* Product 1 */}
  <div className="flex items-start space-x-3">
    {/* Status Dot */}
    <div className="mt-1.5 w-3 h-3 rounded-full bg-green-500 shrink-0" />
    {/* Text Stack */}
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900 leading-tight">Product 1</span>
      <span className="text-sm font-medium text-red-600">11 units</span>
    </div>
  </div>

  {/* Product 2 */}
  <div className="flex items-start space-x-3">
    <div className="mt-1.5 w-3 h-3 rounded-full bg-red-500 shrink-0" />
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900 leading-tight">Product 2</span>
      <span className="text-sm font-medium text-blue-600">10 units</span>
    </div>
  </div>

  {/* Product 3 */}
  <div className="flex items-start space-x-3">
    <div className="mt-1.5 w-3 h-3 rounded-full bg-yellow-500 shrink-0" />
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900 leading-tight">Product 3</span>
      <span className="text-sm font-medium text-yellow-600">18 units</span>
    </div>
  </div>

  {/* Product 4 */}
  <div className="flex items-start space-x-3">
    <div className="mt-1.5 w-3 h-3 rounded-full bg-green-500 shrink-0" />
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900 leading-tight">Product 4</span>
      <span className="text-sm font-medium text-pink-600">19 units</span>
    </div>
  </div>

  {/* Product 5 */}
  <div className="flex items-start space-x-3">
    <div className="mt-1.5 w-3 h-3 rounded-full bg-pink-500 shrink-0" />
    <div className="flex flex-col">
      <span className="font-semibold text-gray-900 leading-tight">Product 5</span>
      <span className="text-sm font-medium text-green-600">12 units</span>
    </div>
  </div>

</div>
</div>

<div className="bg-white rounded-lg border border-gray-200">
  <ProductsDonutChart/>
</div>
  </div>

                        </main></div>
}
