SELECT 
    tbl_business_category.BusinessCategoryId,
    tbl_business_category.Title,
    tbl_business_category.Status,
    tbl_business_category.OrderId,
    (
        SELECT 
            STUFF((
                SELECT ',' + tbl_business_category_image.Image
                FROM tbl_business_category_image
                WHERE tbl_business_category.BusinessCategoryId = tbl_business_category_image.BusinessCategoryId
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'), 1, 1, '') AS Images
    ) AS Images
FROM 
    tbl_business_category;



select tb.Image,tc.Title,tc.Status,tc.OrderId, tc.BusinessCategoryId
from tbl_business_category_image tb
left join tbl_business_category tc on tc.BusinessCategoryId=tb.BusinessCategoryId
where tb.BusinessCategoryId=3

