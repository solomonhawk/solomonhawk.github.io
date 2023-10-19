SELECT n.ZTITLE as title, n.ZTEXT as markdown, datetime(n.ZMODIFICATIONDATE, 'unixepoch', '+31 years') as modifiedAt, json_group_array(t.ZTITLE) AS tags
  FROM ZSFNOTE n
    JOIN Z_5TAGS as nt ON nt.Z_5NOTES = n.Z_PK
    JOIN ZSFNOTETAG as t ON nt.Z_13TAGS = t.Z_PK
  GROUP BY n.ZTITLE, n.ZTEXT
  HAVING tags LIKE '%blog/solomonhawk%';
