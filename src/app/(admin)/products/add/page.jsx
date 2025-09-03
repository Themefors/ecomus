"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Checkbox } from '@/Components/ui/checkbox';
import { Badge } from '@/Components/ui/badge';
import { Plus, X, Upload, Package, DollarSign, Truck, Settings, Eye } from 'lucide-react';

const ProductAddPage = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    media: [],
    category: '',
    pricing: {
      price: 0,
      compareAtPrice: 0,
      chargeTax: true,
      costPerItem: 0,
      profit: null,
      margin: null
    },
    inventory: {
      trackQuantity: true,
      quantity: 0,
      shopLocation: 'Main Store',
      allowOutOfStockSales: false,
      sku: '',
      barcode: ''
    },
    shipping: {
      isPhysicalProduct: true,
      package: {
        dimensions: {
          length: 0,
          width: 0,
          height: 0
        },
        weight: 0,
        weightUnit: 'kg'
      }
    },
    variants: [
      {
        title: 'Default Title',
        price: 0,
        sku: '',
        barcode: ''
      }
    ],
    seo: {
      title: '',
      description: ''
    },
    status: 'active',
    publishing: ['onlineStore'],
    productOrganization: {
      type: 'Default product',
      vendor: '',
      collections: [],
      tags: [],
      themeTemplate: 'Default product'
    }
  });

  const [newTag, setNewTag] = useState('');
  const [imageUrls, setImageUrls] = useState(['']);

  const updateProduct = (path, value) => {
    setProduct(prev => {
      const keys = path.split('.');
      const updated = { ...prev };
      let current = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const addTag = () => {
    if (newTag.trim() && !product.productOrganization.tags.includes(newTag.trim())) {
      updateProduct('productOrganization.tags', [...product.productOrganization.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    updateProduct('productOrganization.tags', product.productOrganization.tags.filter(tag => tag !== tagToRemove));
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, '']);
  };

  const updateImageUrl = (index, url) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
    
    const media = newUrls.filter(url => url.trim()).map(url => ({
      type: 'image',
      url: url.trim()
    }));
    updateProduct('media', media);
  };

  const removeImageUrl = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    
    const media = newUrls.filter(url => url.trim()).map(url => ({
      type: 'image',
      url: url.trim()
    }));
    updateProduct('media', media);
  };

  const handleSave = () => {
    console.log('Product Data:', JSON.stringify(product, null, 2));
    alert('Product saved! Check console for data.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button 
              onClick={handleSave}
              style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
              className="text-white hover:opacity-90"
            >
              Save Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Product Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    id="title"
                    value={product.title}
                    onChange={(e) => updateProduct('title', e.target.value)}
                    placeholder="Enter product title"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={product.description}
                    onChange={(e) => updateProduct('description', e.target.value)}
                    placeholder="Enter product description (HTML supported)"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => updateProduct('category', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="T-Shirts">T-Shirts</SelectItem>
                      <SelectItem value="Jeans">Jeans</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Product Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                    {imageUrls.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeImageUrl(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addImageUrl}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image URL
                </Button>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={product.pricing.price}
                      onChange={(e) => updateProduct('pricing.price', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comparePrice">Compare At Price</Label>
                    <Input
                      id="comparePrice"
                      type="number"
                      value={product.pricing.compareAtPrice}
                      onChange={(e) => updateProduct('pricing.compareAtPrice', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="costPerItem">Cost Per Item</Label>
                  <Input
                    id="costPerItem"
                    type="number"
                    value={product.pricing.costPerItem}
                    onChange={(e) => updateProduct('pricing.costPerItem', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="chargeTax"
                    checked={product.pricing.chargeTax}
                    onCheckedChange={(checked) => updateProduct('pricing.chargeTax', checked)}
                  />
                  <Label htmlFor="chargeTax">Charge tax on this product</Label>
                </div>
              </CardContent>
            </Card>

            {/* Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trackQuantity"
                    checked={product.inventory.trackQuantity}
                    onCheckedChange={(checked) => updateProduct('inventory.trackQuantity', checked)}
                  />
                  <Label htmlFor="trackQuantity">Track quantity</Label>
                </div>

                {product.inventory.trackQuantity && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={product.inventory.quantity}
                        onChange={(e) => updateProduct('inventory.quantity', parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shopLocation">Shop Location</Label>
                      <Select onValueChange={(value) => updateProduct('inventory.shopLocation', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder={product.inventory.shopLocation} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Main Store">Main Store</SelectItem>
                          <SelectItem value="Warehouse">Warehouse</SelectItem>
                          <SelectItem value="Online Only">Online Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={product.inventory.sku}
                      onChange={(e) => updateProduct('inventory.sku', e.target.value)}
                      placeholder="Stock keeping unit"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      value={product.inventory.barcode}
                      onChange={(e) => updateProduct('inventory.barcode', e.target.value)}
                      placeholder="Barcode (ISBN, UPC, etc.)"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowOutOfStock"
                    checked={product.inventory.allowOutOfStockSales}
                    onCheckedChange={(checked) => updateProduct('inventory.allowOutOfStockSales', checked)}
                  />
                  <Label htmlFor="allowOutOfStock">Continue selling when out of stock</Label>
                </div>
              </CardContent>
            </Card>

            {/* Shipping */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="physicalProduct"
                    checked={product.shipping.isPhysicalProduct}
                    onCheckedChange={(checked) => updateProduct('shipping.isPhysicalProduct', checked)}
                  />
                  <Label htmlFor="physicalProduct">This is a physical product</Label>
                </div>

                {product.shipping.isPhysicalProduct && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="length">Length (cm)</Label>
                        <Input
                          id="length"
                          type="number"
                          value={product.shipping.package.dimensions.length}
                          onChange={(e) => updateProduct('shipping.package.dimensions.length', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="width">Width (cm)</Label>
                        <Input
                          id="width"
                          type="number"
                          value={product.shipping.package.dimensions.width}
                          onChange={(e) => updateProduct('shipping.package.dimensions.width', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={product.shipping.package.dimensions.height}
                          onChange={(e) => updateProduct('shipping.package.dimensions.height', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input
                          id="weight"
                          type="number"
                          value={product.shipping.package.weight}
                          onChange={(e) => updateProduct('shipping.package.weight', parseFloat(e.target.value) || 0)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weightUnit">Weight Unit</Label>
                        <Select onValueChange={(value) => updateProduct('shipping.package.weightUnit', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={product.shipping.package.weightUnit} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kg">Kilogram (kg)</SelectItem>
                            <SelectItem value="g">Gram (g)</SelectItem>
                            <SelectItem value="lb">Pound (lb)</SelectItem>
                            <SelectItem value="oz">Ounce (oz)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Product Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => updateProduct('status', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={product.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Publishing</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="onlineStore"
                        checked={product.publishing.includes('onlineStore')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateProduct('publishing', [...product.publishing, 'onlineStore']);
                          } else {
                            updateProduct('publishing', product.publishing.filter(p => p !== 'onlineStore'));
                          }
                        }}
                      />
                      <Label htmlFor="onlineStore">Online Store</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="pointOfSale"
                        checked={product.publishing.includes('pointOfSale')}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateProduct('publishing', [...product.publishing, 'pointOfSale']);
                          } else {
                            updateProduct('publishing', product.publishing.filter(p => p !== 'pointOfSale'));
                          }
                        }}
                      />
                      <Label htmlFor="pointOfSale">Point of Sale</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Organization */}
            <Card>
              <CardHeader>
                <CardTitle>Product Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="vendor">Vendor</Label>
                  <Input
                    id="vendor"
                    value={product.productOrganization.vendor}
                    onChange={(e) => updateProduct('productOrganization.vendor', e.target.value)}
                    placeholder="Product vendor"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        className="flex-1"
                      />
                      <Button
                        onClick={addTag}
                        size="sm"
                        style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
                        className="text-white hover:opacity-90"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.productOrganization.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X
                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle>Search Engine Listing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={product.seo.title}
                    onChange={(e) => updateProduct('seo.title', e.target.value)}
                    placeholder="SEO title"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={product.seo.description}
                    onChange={(e) => updateProduct('seo.description', e.target.value)}
                    placeholder="SEO description for search engines"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline">
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            style={{ backgroundColor: '#ff6c2f', borderColor: '#ff6c2f' }}
            className="text-white hover:opacity-90"
          >
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductAddPage;