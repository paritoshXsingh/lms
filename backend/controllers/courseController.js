import Course from "../models/CourseModel.js";
import Category from "../models/CategoryModel.js";

// export const getCourse = async (req, res) => {
//   try {
//     //fetch the courses from the database
//     const courses = await Course.find({})
//       .populate("category", "name")
//       .populate("instructor", "name");
//     return res.status(200).json(courses);
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const getCourse = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, keyword } = req.query;

    let filter = {};

    // 🔹 Keyword search
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ];
    }

    // 🔹 Category filter
    if (category) {
      const foundCategory = await Category.findOne({
        name: { $regex: `^${category}$`, $options: "i" },
      });

      if (!foundCategory) {
        return res.status(200).json([]);
      }

      filter.category = foundCategory._id;
    }

    // 🔹 Price filter
    if (minPrice || maxPrice) {
      filter.price = {};

      const min = Number(minPrice);
      const max = Number(maxPrice);

      if (minPrice && !Number.isNaN(min)) filter.price.$gte = min;
      if (maxPrice && !Number.isNaN(max)) filter.price.$lte = max;

      if (Object.keys(filter.price).length === 0) {
        delete filter.price;
      }
    }

    const courses = await Course.find(filter)
      .populate("instructor", "name")
      .populate("category", "name");

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    //we get the id from the request params
    const course = await Course.findById(req.params.id)
      .populate("category", "name")
      .populate("instructor", "name");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
