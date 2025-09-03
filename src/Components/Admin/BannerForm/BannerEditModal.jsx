import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCloudinary } from "@/hooks/useCloudinary";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Switch } from '@/Components/ui/switch';
import { Upload, Plus, Trash2 } from 'lucide-react';

export default function BannerEditModal({ isOpen, onClose, banner, onBannerUpdated }) {
  const { uploadImage, deleteImage, uploading, imageUrl, setImageUrl } = useCloudinary();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    heading: '',
    headingStyle: {
      desktopSize: '36px',
      mobileSize: '24px',
      color: '#ff6c2f',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    description: '',
    descriptionStyle: {
      desktopSize: '18px',
      mobileSize: '14px',
      color: '#000000',
      fontWeight: 'normal',
      textAlign: 'center'
    },
    buttons: []
  });

  // Initialize form data when banner changes
  useEffect(() => {
    if (banner && isOpen) {
      setFormData({
        heading: banner.heading || '',
        headingStyle: banner.headingStyle || {
          desktopSize: '36px',
          mobileSize: '24px',
          color: '#ff6c2f',
          fontWeight: 'bold',
          textAlign: 'center'
        },
        description: banner.description || '',
        descriptionStyle: banner.descriptionStyle || {
          desktopSize: '18px',
          mobileSize: '14px',
          color: '#000000',
          fontWeight: 'normal',
          textAlign: 'center'
        },
        buttons: banner.buttons || []
      });
      setImageUrl(banner.image || '');
    }
  }, [banner, isOpen, setImageUrl]);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Delete old image if exists
      if (banner?.public_id) {
        await deleteImage(banner.public_id);
      }
      await uploadImage(file);
    }
  };

  // Handle form changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle style changes
  const handleStyleChange = (styleType, field, value) => {
    setFormData(prev => ({
      ...prev,
      [styleType]: {
        ...prev[styleType],
        [field]: value
      }
    }));
  };

  // Handle button changes
  const handleButtonChange = (index, field, value, styleType = null) => {
    setFormData(prev => {
      const newButtons = [...prev.buttons];
      if (styleType) {
        newButtons[index] = {
          ...newButtons[index],
          [styleType]: {
            ...newButtons[index][styleType],
            [field]: value
          }
        };
      } else {
        newButtons[index] = {
          ...newButtons[index],
          [field]: value
        };
      }
      return {
        ...prev,
        buttons: newButtons
      };
    });
  };

  // Add new button
  const addButton = () => {
    const newButton = {
      text: `Button ${formData.buttons.length + 1}`,
      link: '',
      desktopStyle: {
        bgColor: '#ff6c2f',
        textColor: '#ffffff',
        borderColor: '#ff6c2f',
        borderRadius: '8px',
        fontSize: '16px'
      },
      mobileStyle: {
        bgColor: '#ff6c2f',
        textColor: '#ffffff',
        borderColor: '#ff6c2f',
        borderRadius: '6px',
        fontSize: '14px'
      },
      enabled: true
    };
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, newButton]
    }));
  };

  // Remove button
  const removeButton = (index) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert('Please upload an image');
      return;
    }

    try {
      setUpdating(true);

            const response = await axios.put("/api/banners", {
                id: banner._id, // ⚡ id pathate hobe body te
                ...formData,
                image: imageUrl,
                public_id: imageUrl.split("/").pop().split(".")[0]
            });
      
      onBannerUpdated(response.data);
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Error updating banner');
    } finally {
      setUpdating(false);
    }
  };

  if (!banner) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Banner Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  {imageUrl ? (
                    <div className="text-center">
                      <img src={imageUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg mb-4" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setImageUrl('')}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="mb-4">
                        <Label htmlFor="image-edit" className="cursor-pointer">
                          <span className="bg-[#ff6c2f] text-white px-4 py-2 rounded-lg hover:bg-[#e55a26]">
                            {uploading ? 'Uploading...' : 'Upload New Image'}
                          </span>
                        </Label>
                        <Input
                          id="image-edit"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-gray-500">Upload banner image (JPG, PNG)</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heading-edit">Heading</Label>
                <Input
                  id="heading-edit"
                  value={formData.heading}
                  onChange={(e) => handleChange('heading', e.target.value)}
                  placeholder="Enter banner heading"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description-edit">Description</Label>
                <Textarea
                  id="description-edit"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Enter banner description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Heading Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Heading Styles</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Desktop Size</Label>
                <Input
                  value={formData.headingStyle.desktopSize}
                  onChange={(e) => handleStyleChange('headingStyle', 'desktopSize', e.target.value)}
                  placeholder="36px"
                />
              </div>
              <div>
                <Label>Mobile Size</Label>
                <Input
                  value={formData.headingStyle.mobileSize}
                  onChange={(e) => handleStyleChange('headingStyle', 'mobileSize', e.target.value)}
                  placeholder="24px"
                />
              </div>
              <div>
                <Label>Color</Label>
                <Input
                  type="color"
                  value={formData.headingStyle.color}
                  onChange={(e) => handleStyleChange('headingStyle', 'color', e.target.value)}
                />
              </div>
              <div>
                <Label>Font Weight</Label>
                <select
                  value={formData.headingStyle.fontWeight}
                  onChange={(e) => handleStyleChange('headingStyle', 'fontWeight', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Lighter</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Description Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description Styles</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label>Desktop Size</Label>
                <Input
                  value={formData.descriptionStyle.desktopSize}
                  onChange={(e) => handleStyleChange('descriptionStyle', 'desktopSize', e.target.value)}
                  placeholder="18px"
                />
              </div>
              <div>
                <Label>Mobile Size</Label>
                <Input
                  value={formData.descriptionStyle.mobileSize}
                  onChange={(e) => handleStyleChange('descriptionStyle', 'mobileSize', e.target.value)}
                  placeholder="14px"
                />
              </div>
              <div>
                <Label>Color</Label>
                <Input
                  type="color"
                  value={formData.descriptionStyle.color}
                  onChange={(e) => handleStyleChange('descriptionStyle', 'color', e.target.value)}
                />
              </div>
              <div>
                <Label>Font Weight</Label>
                <select
                  value={formData.descriptionStyle.fontWeight}
                  onChange={(e) => handleStyleChange('descriptionStyle', 'fontWeight', e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                  <option value="lighter">Lighter</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Buttons</CardTitle>
              <Button
                type="button"
                onClick={addButton}
                size="sm"
                className="bg-[#ff6c2f] hover:bg-[#e55a26]"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Button
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.buttons.map((button, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Button {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`enabled-edit-${index}`}>Enabled</Label>
                      <Switch
                        id={`enabled-edit-${index}`}
                        checked={button.enabled}
                        onCheckedChange={(checked) => handleButtonChange(index, 'enabled', checked)}
                      />
                      {formData.buttons.length > 1 && (
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => removeButton(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={button.text}
                        onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                        placeholder="Button text"
                      />
                    </div>
                    <div>
                      <Label>Link</Label>
                      <Input
                        value={button.link}
                        onChange={(e) => handleButtonChange(index, 'link', e.target.value)}
                        placeholder="/link"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium mb-2">Desktop Style</h5>
                      <div className="space-y-2">
                        <Input
                          type="color"
                          value={button.desktopStyle.bgColor}
                          onChange={(e) => handleButtonChange(index, 'bgColor', e.target.value, 'desktopStyle')}
                          title="Background Color"
                        />
                        <Input
                          type="color"
                          value={button.desktopStyle.textColor}
                          onChange={(e) => handleButtonChange(index, 'textColor', e.target.value, 'desktopStyle')}
                          title="Text Color"
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Mobile Style</h5>
                      <div className="space-y-2">
                        <Input
                          type="color"
                          value={button.mobileStyle.bgColor}
                          onChange={(e) => handleButtonChange(index, 'bgColor', e.target.value, 'mobileStyle')}
                          title="Background Color"
                        />
                        <Input
                          type="color"
                          value={button.mobileStyle.textColor}
                          onChange={(e) => handleButtonChange(index, 'textColor', e.target.value, 'mobileStyle')}
                          title="Text Color"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={updating || uploading || !imageUrl}
              className="bg-[#ff6c2f] hover:bg-[#e55a26]"
            >
              {updating ? 'Updating...' : 'Update Banner'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}