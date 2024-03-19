import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  List,
  Button,
  Pagination,
  Divider,
  Form,
  Input,
  Select,
  Spin,
} from "antd";
import { fetchArtworks } from "../services/ApiService";

const { Option } = Select;

const ArtifactsList = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [categoryList, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // This function should handle the submission of the form
    // 'values' will contain the form data
    console.log("Received values of form: ", values);
    setSearchTerm(values.searchTerm);
    setCategoryFilter(values.category);
    await loadArtworks(1, values.searchTerm, values.category);
  };

  const loadArtworks = async (currentPage, searchTerm, categoryFilter) => {
    setLoading(true);
    const data = await fetchArtworks(currentPage, searchTerm, categoryFilter);
    if (data?.artifacts) {
      setArtworks(data.artifacts);

      // Accumulate unique department titles or categories
      const newCategories = new Set([...categoryList]);
      data.artifacts.forEach((artifact) => {
        newCategories.add(...artifact.category_titles);
      });

      // Convert the Set back to an array and update the categories state
      setCategories([...newCategories]);

      if (data.pagination) {
        setCurrentPage(data.pagination.current_page);
        setTotal(data.pagination.total);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  const onChange = async (page) => {
    await loadArtworks(page, searchTerm, categoryFilter);
  };

  const filteredArtworks = () => {
    return artworks.filter((artwork) => {
      // If no category filter is selected, show all artworks
      if (!categoryFilter?.length) return true;
      // Check if the artwork's categories include any of the selected filters
      return categoryFilter.some((category) =>
        artwork.category_titles.includes(category)
      );
    });
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        name="search_filter"
        onFinish={onFinish}
        layout="inline"
      >
        <Form.Item name="searchTerm" label="Search">
          <Input placeholder="Search by title" />
        </Form.Item>
        <Form.Item name="category" label="Category">
          <Select
            placeholder="Select a category"
            mode="multiple"
            allowClear
            style={{ minWidth: "200px" }}
          >
            {categoryList.map((category, index) => (
              <Option key={index} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Divider></Divider>
      <List
        bordered
        dataSource={filteredArtworks()}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src={item?.thumbnail?.lqip} />}
              title={<Link to={`/artifact/${item.id}`}>{item.title}</Link>}
              description={item.artist_display}
            />
          </List.Item>
        )}
      />

      <Divider></Divider>
      {total > 0 && (
        <Pagination
          onChange={onChange}
          defaultCurrent={currentPage}
          showSizeChanger={false}
          showTotal={(total) => `Total ${total} artificats`}
          total={total}
        />
      )}
    </Spin>
  );
};

export default ArtifactsList;
