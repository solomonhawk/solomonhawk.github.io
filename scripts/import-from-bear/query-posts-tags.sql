SELECT n.ZTITLE as title, n.ZTEXT as markdown, n.ZMODIFICATIONDATE as modifiedAt, json_group_array(t.ZTITLE) AS tags
  FROM ZSFNOTE n
    JOIN Z_7TAGS as nt ON nt.Z_7NOTES = n.Z_PK
    JOIN ZSFNOTETAG as t ON nt.Z_14TAGS = t.Z_PK
  GROUP BY n.ZTITLE, n.ZTEXT
  HAVING tags LIKE '%blog/solomonhawk%';