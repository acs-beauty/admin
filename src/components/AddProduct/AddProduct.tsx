import React, { ChangeEvent, useState } from "react"
import { Formik, Form, Field } from 'formik';
import { useAppDispatch } from "../../redux/hooks.ts"
import { createNewProduct } from "../../redux/products/operations.ts"
import { IFormData } from "../../types/products/IFormData.ts"

function MyForm() {
  const [formDataProduct, setFormDataProduct] = useState<IFormData>({
    name: '',
    description: '',
    price: 0,
    discount: 0,
    count: 0,
    novelty: false,
    hit: false,
    subcategoryId: 0,
    brandId: 0,
    imageIds: '',
    images: []
  });

  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement; // Уточняем тип элемента
    const name = target.name;
    if (target.type === 'file') {
      const files = target.files;
      setFormDataProduct({
        ...formDataProduct,
        images: files ? Array.from(files) : []
      });
    } else {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      setFormDataProduct({
        ...formDataProduct,
        [name]: value
      });
    }
  }
  const handleSubmit = async (value: any) => {
    const dataToSend = new FormData();
    Object.keys(formDataProduct).forEach(key => {
      const value = formDataProduct[key as keyof IFormData];
      if (key === 'images') {
        formDataProduct.images.forEach((file, index) => {
          dataToSend.append(`images[${index}]`, file);
        });
      } else if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
        dataToSend.append(key, value.toString());
      }
    });

    try {
      const response = await dispatch(createNewProduct(dataToSend)).unwrap();
      console.log('Успешно:', response);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <Formik initialValues={formDataProduct} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Field name="name" type="text" placeholder="Name" value={formDataProduct.name} onChange={handleChange}/>
          <Field name="description" as="textarea" placeholder="Description" value={formDataProduct.description} onChange={handleChange}/>
          <Field name="price" type="number" value={formDataProduct.price} onChange={handleChange} />
          <Field name="discount" type="number" value={formDataProduct.discount} onChange={handleChange} />
          <Field name="count" type="number" value={formDataProduct.count} onChange={handleChange} />
          <Field name="novelty" type="checkbox" value={formDataProduct.novelty} onChange={handleChange} />
          <Field name="hit" type="checkbox" value={formDataProduct.hit} onChange={handleChange} />
          <Field name="subcategoryId" type="number" value={formDataProduct.subcategoryId} onChange={handleChange} />
          <Field name="brandId" type="number" value={formDataProduct.brandId} onChange={handleChange} />
          <Field name="imageIds" type="text" value={formDataProduct.imageIds} onChange={handleChange} />
          <input
            name="images"
            type="file"
            multiple
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default MyForm;